import { chromium } from "playwright";
import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const DECK = "C:\\Users\\user\\Desktop\\skillTest\\venom-deck";
const OUT = path.join(DECK, "verify");
const SHOTS = path.join(OUT, "shots");
fs.mkdirSync(SHOTS, { recursive: true });

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".json": "application/json; charset=utf-8",
  ".csv": "text/csv; charset=utf-8"
};

const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split("?")[0].split("#")[0]);
  if (p === "/") p = "/index.html";
  const file = path.join(DECK, p);
  if (!file.startsWith(DECK)) { res.writeHead(403); res.end(); return; }
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); res.end("not found"); return; }
    res.writeHead(200, { "Content-Type": MIME[path.extname(file)] || "application/octet-stream" });
    res.end(data);
  });
});

await new Promise((r) => server.listen(0, "127.0.0.1", r));
const port = server.address().port;
const base = `http://127.0.0.1:${port}`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });

const consoleErrors = [];
const pageErrors = [];
const failedRequests = [];
page.on("console", (m) => { if (m.type() === "error") consoleErrors.push(m.text()); });
page.on("pageerror", (e) => pageErrors.push(String(e)));
page.on("requestfailed", (r) => failedRequests.push(`${r.url()} :: ${r.failure()?.errorText}`));

await page.goto(base + "/", { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(1200);

const info = await page.evaluate(() => {
  const imgs = Array.from(document.images).map((i) => ({ src: i.getAttribute("src"), ok: i.complete && i.naturalWidth > 0 }));
  return {
    revealReady: typeof Reveal !== "undefined" && Reveal.isReady(),
    totalSlides: (typeof Reveal !== "undefined") ? Reveal.getTotalSlides() : -1,
    images: imgs,
    anime: typeof anime !== "undefined",
    chart: typeof Chart !== "undefined"
  };
});

const results = [];
for (let i = 0; i < info.totalSlides; i++) {
  await page.goto(base + `/#/${i}`, { waitUntil: "networkidle", timeout: 30000 }).catch(() => {});
  await page.waitForTimeout(1100);
  const shot = path.join(SHOTS, `slide-${String(i + 1).padStart(2, "0")}.png`);
  await page.screenshot({ path: shot });
  const cur = await page.evaluate(() => (typeof Reveal !== "undefined" ? Reveal.getIndices().h : -1));
  results.push({ slide: i, index: cur, shot });
}

await browser.close();
server.close();

const report = {
  revealReady: info.revealReady,
  totalSlides: info.totalSlides,
  animeLoaded: info.anime,
  chartLoaded: info.chart,
  imagesBroken: info.images.filter((x) => !x.ok),
  imagesTotal: info.images.length,
  consoleErrors,
  pageErrors,
  failedRequests,
  slidesCaptured: results.length,
  ok: info.revealReady && info.anime && info.chart &&
      pageErrors.length === 0 && info.images.filter((x) => !x.ok).length === 0
};

fs.writeFileSync(path.join(OUT, "report.json"), JSON.stringify(report, null, 2), "utf-8");
console.log(JSON.stringify(report, null, 2));
