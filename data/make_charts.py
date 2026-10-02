# -*- coding: utf-8 -*-
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch
import numpy as np
import os

OUT = r"C:\Users\user\Desktop\skillTest\venom-deck\assets\charts"
os.makedirs(OUT, exist_ok=True)

plt.rcParams["font.family"] = "Malgun Gothic"
plt.rcParams["axes.unicode_minus"] = False

BG = "#0d1117"
PANEL = "#161b22"
FG = "#c9d1d9"
MUTED = "#8b949e"
GREEN = "#3fb950"
RED = "#f85149"
BLUE = "#58a6ff"
PURPLE = "#bc8cff"
YELLOW = "#d29922"
PINK = "#f778ba"

def style_ax(ax):
    ax.set_facecolor(PANEL)
    for s in ax.spines.values():
        s.set_color("#30363d")
    ax.tick_params(colors=MUTED, labelsize=11)
    ax.grid(axis="x", color="#21262d", linewidth=0.8)

def savefig(fig, name):
    path = os.path.join(OUT, name)
    fig.savefig(path, dpi=200, facecolor=BG, bbox_inches="tight", pad_inches=0.35)
    plt.close(fig)
    print("saved", path)

# ---------- 1. 긍정/부정 포인트 ----------
pos = {
    "조립/커스텀 자유도": 10, "8K/응답속도": 8, "래피드트리거/브레이킹": 7,
    "저소음/타건감": 5, "RGB/LED 감성": 4, "마감/디자인": 2,
    "가성비": 2, "손목 편안함": 2,
}
neg = {
    "60% 배열 적응": 4, "키캡 호환 제약": 4, "비용 과다": 4,
    "도터보드 파손/조립난도": 3, "설정/매뉴얼 난해": 1,
    "통울림": 1, "ABS 번들거림": 1,
}

fig, axes = plt.subplots(1, 2, figsize=(15, 6.2))
fig.patch.set_facecolor(BG)

for ax, data, color, title in [
    (axes[0], pos, GREEN, "긍정 포인트 (총 40건)"),
    (axes[1], neg, RED, "부정/아쉬움 포인트 (총 18건)"),
]:
    labels = list(data.keys())[::-1]
    vals = list(data.values())[::-1]
    y = np.arange(len(labels))
    bars = ax.barh(y, vals, color=color, alpha=0.9, height=0.62,
                   edgecolor="none")
    ax.set_yticks(y)
    ax.set_yticklabels(labels, color=FG, fontsize=12)
    ax.set_xlim(0, max(vals) + 2.2)
    ax.set_title(title, color="#f0f6fc", fontsize=15, pad=14, fontweight="bold")
    style_ax(ax)
    for b, v in zip(bars, vals):
        ax.text(b.get_width() + 0.15, b.get_y() + b.get_height()/2,
                str(v), va="center", color=color, fontsize=12, fontweight="bold")
    for s in ["top", "right", "left"]:
        ax.spines[s].set_visible(False)
    ax.grid(axis="y", visible=False)

fig.suptitle("베놈 키보드 리뷰 감성 분석", color="#f0f6fc", fontsize=19,
             fontweight="bold", y=1.02)
savefig(fig, "posneg.png")

# ---------- 2. 가격/비용 ----------
costs = [
    ("60HE 실빌드 (블로그)", 288705, PINK),
    ("87HE v2 중고 완성품", 280000, RED),
    ("60HE 중고 완성품", 150000, YELLOW),
    ("60HE 부품(기판+보강+흡음)", 130000, PURPLE),
    ("60HE 완제품(블로그)", 112000, BLUE),
    ("80HE F12 PCB 정가", 100000, GREEN),
    ("60HE PCB 단품", 92000, BLUE),
    ("60HE PCB (입문자)", 76000, GREEN),
]
fig, ax = plt.subplots(figsize=(13, 6.6))
fig.patch.set_facecolor(BG)
labels = [c[0] for c in costs][::-1]
vals = [c[1] for c in costs][::-1]
colors = [c[2] for c in costs][::-1]
y = np.arange(len(labels))
ax.barh(y, vals, color=colors, alpha=0.9, height=0.62)
ax.set_yticks(y)
ax.set_yticklabels(labels, color=FG, fontsize=12)
ax.set_xlim(0, max(vals) * 1.16)
style_ax(ax)
ax.set_title("제작·구매 비용대 비교 (원)", color="#f0f6fc", fontsize=17,
             pad=14, fontweight="bold")
for i, v in enumerate(vals):
    ax.text(v + max(vals)*0.012, i, f"{v:,}", va="center", color="#f0f6fc",
            fontsize=11.5, fontweight="bold")
for s in ["top", "right", "left"]:
    ax.spines[s].set_visible(False)
ax.grid(axis="y", visible=False)
fig.text(0.5, -0.03, "부품 구성에 따라 편차가 큼 · 게시 시점 기준",
         ha="center", color=MUTED, fontsize=10.5)
savefig(fig, "price.png")

# ---------- 3. 지연시간 비교 ----------
cats = ["입력 지연 (ms)", "해제 지연 (ms)"]
blackwidow = [15.5, 20.0]
venom_default = [18.0, 20.0]
venom_tuned = [10.0, 10.0]
x = np.arange(len(cats))
w = 0.26
fig, ax = plt.subplots(figsize=(11, 6.2))
fig.patch.set_facecolor(BG)
b1 = ax.bar(x - w, blackwidow, w, label="레이저 블랙위도우 V4", color="#8b949e")
b2 = ax.bar(x, venom_default, w, label="베놈 60HE (기본값)", color=YELLOW)
b3 = ax.bar(x + w, venom_tuned, w, label="베놈 60HE (설정 최적화)", color=GREEN)
ax.set_xticks(x)
ax.set_xticklabels(cats, color=FG, fontsize=13)
ax.set_ylabel("지연 시간 (ms) — 낮을수록 좋음", color=MUTED, fontsize=11.5)
ax.set_title("지연 시간 비교: 설정에 따라 역전", color="#f0f6fc",
             fontsize=17, pad=14, fontweight="bold")
ax.legend(facecolor=PANEL, edgecolor="#30363d", labelcolor=FG, fontsize=10.5)
ax.set_ylim(0, 24)
style_ax(ax)
for bars in (b1, b2, b3):
    for b in bars:
        ax.text(b.get_x()+b.get_width()/2, b.get_height()+0.4,
                f"{b.get_height():.0f}", ha="center", color="#f0f6fc",
                fontsize=10.5, fontweight="bold")
for s in ["top", "right"]:
    ax.spines[s].set_visible(False)
savefig(fig, "latency.png")

# ---------- 4. 레이더 ----------
labels = ["성능\n(8K·RT)", "커스텀\n자유도", "저소음", "휴대성", "가성비", "조립\n편의성"]
values = [0.95, 1.00, 0.75, 0.85, 0.55, 0.40]
angles = np.linspace(0, 2*np.pi, len(labels), endpoint=False).tolist()
values += values[:1]
angles += angles[:1]
fig = plt.figure(figsize=(8.2, 8.2))
fig.patch.set_facecolor(BG)
ax = fig.add_subplot(111, polar=True)
ax.set_facecolor(PANEL)
ax.plot(angles, values, color=GREEN, linewidth=2.4)
ax.fill(angles, values, color=GREEN, alpha=0.22)
ax.set_xticks(angles[:-1])
ax.set_xticklabels(labels, color=FG, fontsize=12)
ax.set_yticks([0.25, 0.5, 0.75, 1.0])
ax.set_yticklabels(["25", "50", "75", "100"], color=MUTED, fontsize=9)
ax.set_ylim(0, 1.0)
ax.tick_params(colors=MUTED)
ax.spines["polar"].set_color("#30363d")
ax.grid(color="#30363d", linewidth=0.8)
ax.set_title("베놈 60HE 종합 프로파일 (리뷰 기반 정성 평가)",
             color="#f0f6fc", fontsize=15, pad=24, fontweight="bold")
savefig(fig, "radar.png")

# ---------- 5. 출처 도넛 ----------
src = {
    "네이버 블로그": 11, "기타 블로그": 3, "번개장터(중고)": 2,
    "YouTube/영상": 2, "퀘이사존": 1, "쿠팡/블로그": 1,
    "RTINGS": 1, "GeekNews": 1, "검색트렌드": 1,
}
fig, ax = plt.subplots(figsize=(9.5, 7))
fig.patch.set_facecolor(BG)
palette = ["#58a6ff", "#3fb950", "#f85149", "#d29922", "#bc8cff",
           "#f778ba", "#39c5cf", "#8b949e", "#db6d28"]
wedges, texts, autotexts = ax.pie(
    src.values(), labels=None, autopct="%1.0f%%", startangle=90,
    colors=palette, pctdistance=0.78,
    wedgeprops=dict(width=0.42, edgecolor=BG, linewidth=2),
    textprops=dict(color=BG, fontsize=10, fontweight="bold"),
)
ax.legend(wedges, [f"{k} ({v})" for k, v in src.items()],
          loc="center left", bbox_to_anchor=(0.98, 0.5),
          facecolor=PANEL, edgecolor="#30363d", labelcolor=FG, fontsize=11)
ax.set_title("리뷰 출처 분포 (총 23건)", color="#f0f6fc",
             fontsize=16, fontweight="bold", pad=16)
savefig(fig, "sources.png")

print("ALL DONE")
