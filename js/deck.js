/* ===== 베놈 키보드 리뷰 덱 스크립트 ===== */
(function () {
  "use strict";

  var sourceChart = null;

  var SOURCE_DATA = {
    labels: [
      "네이버 블로그", "기타 블로그", "번개장터(중고)", "YouTube/영상",
      "퀘이사존", "쿠팡/블로그", "RTINGS", "GeekNews", "검색트렌드"
    ],
    values: [11, 3, 2, 2, 1, 1, 1, 1, 1],
    colors: [
      "#58a6ff", "#3fb950", "#f85149", "#d29922",
      "#bc8cff", "#f778ba", "#39c5cf", "#8b949e", "#db6d28"
    ]
  };

  function initSourceChart() {
    if (sourceChart) { sourceChart.resize(); return; }
    var ctx = document.getElementById("sourceChart");
    if (!ctx || typeof Chart === "undefined") return;
    sourceChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: SOURCE_DATA.labels,
        datasets: [{
          label: "리뷰 건수",
          data: SOURCE_DATA.values,
          backgroundColor: SOURCE_DATA.colors,
          borderRadius: 6,
          barThickness: 22
        }]
      },
      options: {
        indexAxis: "y",
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 900, easing: "easeOutQuart" },
        plugins: {
          legend: { display: false },
          title: {
            display: true,
            text: "리뷰 출처 분포 (총 23건)",
            color: "#f0f6fc",
            font: { size: 16, weight: "bold" },
            padding: { bottom: 14 }
          },
          tooltip: {
            backgroundColor: "#161b22",
            borderColor: "#30363d",
            borderWidth: 1,
            titleColor: "#f0f6fc",
            bodyColor: "#c9d1d9"
          }
        },
        scales: {
          x: {
            beginAtZero: true,
            max: 12,
            ticks: { color: "#8b949e", stepSize: 2 },
            grid: { color: "#21262d" }
          },
          y: {
            ticks: { color: "#c9d1d9", font: { size: 12 } },
            grid: { display: false }
          }
        }
      }
    });
  }

  function animateCount(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    if (isNaN(target)) return;
    var decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
    var suffix = el.getAttribute("data-suffix") || "";
    var obj = { v: 0 };
    anime.remove(obj);
    anime({
      targets: obj,
      v: target,
      duration: 1500,
      easing: "easeOutExpo",
      round: decimals ? Math.pow(10, decimals) : 1,
      update: function () {
        el.textContent = (decimals ? obj.v.toFixed(decimals) : Math.round(obj.v)) + suffix;
      }
    });
  }

  function animateSection(section) {
    if (!section) return;
    var anims = section.querySelectorAll(".anim");
    if (anims.length && typeof anime !== "undefined") {
      anime.remove(anims);
      anime({
        targets: anims,
        opacity: [0, 1],
        translateY: [16, 0],
        duration: 650,
        delay: anime.stagger(60),
        easing: "easeOutCubic"
      });
    } else if (anims.length) {
      Array.prototype.forEach.call(anims, function (el) { el.style.opacity = 1; });
    }

    var counters = section.querySelectorAll(".stat-value[data-count]");
    Array.prototype.forEach.call(counters, animateCount);

    if (section.querySelector("#sourceChart")) initSourceChart();
  }

  function initCoverCanvas() {
    var canvas = document.getElementById("cover-canvas");
    if (!canvas) return;
    var ctx = canvas.getContext("2d");
    var w, h, dpr, points, raf, active = true;
    var GREEN = "63,185,80", RED = "248,81,73";

    function resize() {
      dpr = window.devicePixelRatio || 1;
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var count = Math.min(70, Math.max(28, Math.floor(w / 26)));
      points = [];
      for (var i = 0; i < count; i++) {
        points.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          r: Math.random() * 1.8 + 0.8,
          red: Math.random() > 0.72
        });
      }
    }

    function draw() {
      if (!active) return;
      ctx.clearRect(0, 0, w, h);
      for (var i = 0; i < points.length; i++) {
        var p = points[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        var c = p.red ? RED : GREEN;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(" + c + ",0.75)";
        ctx.fill();
        for (var j = i + 1; j < points.length; j++) {
          var q = points[j];
          var dx = p.x - q.x, dy = p.y - q.y;
          var d2 = dx * dx + dy * dy;
          if (d2 < 16000) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = "rgba(" + c + "," + (0.14 * (1 - d2 / 16000)) + ")";
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("resize", function () { if (sourceChart) sourceChart.resize(); });
  }

  function boot() {
    Reveal.initialize({
      hash: true,
      slideNumber: "c/t",
      controls: true,
      progress: true,
      center: false,
      width: 1280,
      height: 720,
      margin: 0.04,
      transition: "slide",
      backgroundTransition: "fade",
      minScale: 0.2,
      maxScale: 1.6
    });

    Reveal.on("ready", function (e) {
      animateSection(e.currentSlide);
      initCoverCanvas();
    });
    Reveal.on("slidechanged", function (e) {
      animateSection(e.currentSlide);
      if (sourceChart) setTimeout(function () { sourceChart.resize(); }, 60);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
