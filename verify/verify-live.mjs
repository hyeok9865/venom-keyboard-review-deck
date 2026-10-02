import { chromium } from "playwright";

const URL = "https://hyeok9865.github.io/venom-keyboard-review-deck/";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });

const consoleErrors = [];
const pageErrors = [];
const failed = [];
page.on("console", (m) => { if (m.type() === "error") consoleErrors.push(m.text()); });
page.on("pageerror", (e) => pageErrors.push(String(e)));
page.on("requestfailed", (r) => failed.push(`${r.url()} :: ${r.failure()?.errorText}`));

await page.goto(URL, { waitUntil: "networkidle", timeout: 90000 });
await page.waitForTimeout(1500);

const info = await page.evaluate(() => ({
  revealReady: typeof Reveal !== "undefined" && Reveal.isReady(),
  totalSlides: typeof Reveal !== "undefined" ? Reveal.getTotalSlides() : -1,
  anime: typeof anime !== "undefined",
  chart: typeof Chart !== "undefined",
  brokenImgs: Array.from(document.images).filter((i) => !(i.complete && i.naturalWidth > 0)).map((i) => i.getAttribute("src"))
}));

await page.screenshot({ path: "C:\\Users\\user\\Desktop\\skillTest\\venom-deck\\verify\\shots\\live-cover.png" });
await page.goto(URL + "#/4", { waitUntil: "networkidle", timeout: 60000 }).catch(() => {});
await page.waitForTimeout(1800);
await page.screenshot({ path: "C:\\Users\\user\\Desktop\\skillTest\\venom-deck\\verify\\shots\\live-data.png" });

await browser.close();
const report = { url: URL, ...info, consoleErrors, pageErrors, failed,
  ok: info.revealReady && info.anime && info.chart && info.totalSlides === 14 &&
      pageErrors.length === 0 && info.brokenImgs.length === 0 };
console.log(JSON.stringify(report, null, 2));
