#!/usr/bin/env python3
# Procedural sprite generator for Ore Generators mod additions.
# Generates ONLY new sprites (existing art is left untouched) using a consistent
# visual recipe: metal frame + dark panel + bright center gem + tier glyphs,
# plus glow/spin/spin-blur overlays for animated blocks.
import os

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

OUT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "sprites", "blocks"))
os.makedirs(OUT, exist_ok=True)


def rgb(h):
    h = h.lstrip("#")
    return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))


def to_img(arr):
    return Image.fromarray(arr, "RGBA")


def save(name, arr):
    to_img(arr).save(os.path.join(OUT, name + ".png"))


def rounded_mask(size, box, radius):
    im = Image.new("L", (size, size), 0)
    d = ImageDraw.Draw(im)
    d.rounded_rectangle(box, radius=radius, fill=255)
    return np.array(im, dtype=bool)


def vgrad(arr, mask, top, bottom):
    size = arr.shape[0]
    rows = np.where(mask.any(axis=1))[0]
    if rows.size == 0:
        return
    y0, y1 = rows.min(), rows.max()
    span = max(1, y1 - y0)
    top = np.array(top, dtype=np.float32)
    bottom = np.array(bottom, dtype=np.float32)
    for y in range(y0, y1 + 1):
        t = (y - y0) / span
        c = tuple(int(top[i] + (bottom[i] - top[i]) * t) for i in range(3))
        arr[y, mask[y], 0:3] = c
        arr[y, mask[y], 3] = 255


def draw_diamond(arr, cx, cy, r, top, bottom, alpha=255):
    size = arr.shape[0]
    yy, xx = np.mgrid[0:size, 0:size]
    d = np.abs(xx - cx) + np.abs(yy - cy)
    inside = d <= r
    t = np.clip((yy - (cy - r)) / (2 * r + 1e-6), 0, 1)
    top = np.array(top, dtype=np.float32)
    bottom = np.array(bottom, dtype=np.float32)
    col = top[None, None, :] * (1 - t[..., None]) + bottom[None, None, :] * t[..., None]
    arr[inside, 0:3] = col[inside]
    arr[inside, 3] = alpha


def draw_circle(arr, cx, cy, r, color, alpha=255):
    size = arr.shape[0]
    yy, xx = np.mgrid[0:size, 0:size]
    inside = (xx - cx) ** 2 + (yy - cy) ** 2 <= r * r
    arr[inside, 0:3] = np.array(color)
    arr[inside, 3] = alpha


def draw_line(arr, x0, y0, x1, y1, color, w=1, alpha=255):
    x0, y0, x1, y1 = round(x0), round(y0), round(x1), round(y1)
    n = max(1, int(max(abs(x1 - x0), abs(y1 - y0))))
    xs = np.linspace(x0, x1, n)
    ys = np.linspace(y0, y1, n)
    for x, y in zip(xs, ys):
        for dx in range(-w, w + 1):
            for dy in range(-w, w + 1):
                xi, yi = int(round(x + dx)), int(round(y + dy))
                if 0 <= xi < arr.shape[0] and 0 <= yi < arr.shape[0]:
                    arr[yi, xi, 0:3] = np.array(color)
                    arr[yi, xi, 3] = alpha


def build_generator(size, theme, variant="powered"):
    """Return dict with 'base','glow','spin','spin_blur' numpy arrays."""
    frame_l, frame_d = rgb(theme["frame"][0]), rgb(theme["frame"][1])
    panel_l, panel_d = rgb(theme["panel"][0]), rgb(theme["panel"][1])
    gem_l, gem_d = rgb(theme["gem"][0]), rgb(theme["gem"][1])
    accent = rgb(theme["accent"])

    base = np.zeros((size, size, 4), dtype=np.uint8)
    inset = max(3, size // 16)
    radius = max(4, int(size * 0.14))
    outer = rounded_mask(size, (2, 2, size - 3, size - 3), radius)
    inner = rounded_mask(size, (inset, inset, size - 1 - inset, size - 1 - inset), max(2, radius - inset))
    frame_mask = outer & ~inner
    vgrad(base, frame_mask, frame_l, frame_d)
    vgrad(base, inner, panel_l, panel_d)

    cx = cy = (size - 1) / 2.0
    gem_r = max(6, int(size * 0.21))
    if variant == "unpowered":
        # grille slits instead of gem
        slit_w = max(2, size // 12)
        n = 3
        for i in range(n):
            sx = int(cx - gem_r * 0.9 + i * (gem_r * 1.8 / (n - 1)))
            top = int(cy - gem_r * 1.2)
            bot = int(cy + gem_r * 1.2)
            for y in range(top, bot):
                for dx in range(-slit_w // 2, slit_w // 2 + 1):
                    x = sx + dx
                    shade = 255 - int((y - top) / max(1, bot - top) * 120)
                    if 0 <= x < size:
                        base[y, x, 0:3] = np.array([shade, shade, shade], dtype=np.uint8)
                        base[y, x, 3] = 255
        for y in range(0, size):
            base[y, 4, 0:3] = np.array(frame_l)
            base[y, 4, 3] = 255
        base[int(size / 2), int(size / 2), 0:3] = np.array(gem_d)
        base[int(size / 2), int(size / 2), 3] = 255
        return {"base": base, "glow": None, "spin": None, "spin_blur": None}

    if variant in ("water", "ozone"):
        # tint panel toward liquid colour, keep gem as the liquid colour
        liquid = rgb(theme["liquid"]) if "liquid" in theme else gem_l
        panel_l = tuple(int(a * 0.55 + b * 0.45) for a, b in zip(panel_l, liquid))
        panel_d = tuple(int(a * 0.55 + b * 0.45) for a, b in zip(panel_d, liquid))
        vgrad(base, inner, panel_l, panel_d)
        draw_diamond(base, cx, cy, gem_r, tuple(max(min(int(a * 1.25), 255), a) for a in liquid), gem_d)
        # droplet glyph
        drop_c = rgb(theme["accent"]) if "accent" in theme else liquid
        dr = max(3, int(size * 0.08))
        dy = int(cy + gem_r * 1.35)
        draw_circle(base, cx, dy, dr, drop_c)
        for i in range(dr, 0, -1):
            draw_line(base, cx, dy - dr - (dr - i), cx - i, dy, drop_c, alpha=160)
            draw_line(base, cx, dy - dr - (dr - i), cx + i, dy, drop_c, alpha=160)
    elif variant == "cryo":
        draw_diamond(base, cx, cy, gem_r, gem_l, gem_d)
        # snowflake glyph
        c = rgb(theme["accent"])
        R = int(gem_r * 1.5)
        for a in range(0, 360, 60):
            rad = np.deg2rad(a)
            x1 = int(cx + np.cos(rad) * R)
            y1 = int(cy + np.sin(rad) * R)
            draw_line(base, int(cx), int(cy), x1, y1, c, alpha=170)
            xm = int(cx + np.cos(rad) * R * 0.6)
            ym = int(cy + np.sin(rad) * R * 0.6)
            px = int(ym - cy)
            py = int(xm - cx)
            draw_line(base, int(xm) - px, int(ym) - py, int(xm) + px, int(ym) + py, c, alpha=170)
    elif variant == "magma":
        draw_diamond(base, cx, cy, gem_r, gem_l, gem_d)
        # lava cracks radiating from the gem
        crack = rgb(theme["crack"]) if "crack" in theme else accent
        for a in (18, 78, 140, 205, 265, 320):
            rad = np.deg2rad(a)
            R0 = gem_r * 1.3
            R1 = size * 0.42 + np.random.uniform(-3, 3)
            x0 = int(cx + np.cos(rad) * R0)
            y0 = int(cy + np.sin(rad) * R0)
            x1 = int(cx + np.cos(rad) * R1)
            y1 = int(cy + np.sin(rad) * R1)
            draw_line(base, x0, y0, x1, y1, crack, w=1, alpha=200)
            if np.random.rand() > 0.5:
                midx = int((x0 + x1) / 2) + np.random.randint(-int(size * 0.08), int(size * 0.08))
                midy = int((y0 + y1) / 2) + np.random.randint(-int(size * 0.08), int(size * 0.08))
                draw_line(base, int((x0 + midx) / 2), int((y0 + midy) / 2), midx, midy, crack, w=1, alpha=160)
        # flame glyph over the gem
        flame = rgb(theme["flame"]) if "flame" in theme else accent
        fr = max(3, int(size * 0.07))
        fy = int(cy - gem_r * 1.35)
        draw_circle(base, cx, fy, fr, flame)
        for i in range(fr, 0, -1):
            draw_line(base, cx, fy + fr + (fr - i), cx - i, fy, flame, alpha=170)
            draw_line(base, cx, fy + fr + (fr - i), cx + i, fy, flame, alpha=170)
    elif variant == "synthesizer":
        # cluster of small gems in a ring to hint multi-output
        for i, off in enumerate(((0, -1), (1, 0), (0, 1), (-1, 0))):
            a = i * np.pi / 2 + np.pi / 4
            gx = cx + np.cos(a) * gem_r * 0.62
            gy = cy + np.sin(a) * gem_r * 0.62
            draw_diamond(base, gx, gy, gem_r * 0.55, gem_l, gem_d, alpha=230)
        draw_diamond(base, cx, cy, gem_r * 0.7, tuple(min(int(a * 1.2), 255) for a in gem_l), gem_d)
    else:
        # powered / icon / research: plain bright gem
        draw_diamond(base, cx, cy, gem_r, gem_l, gem_d)

    # corner rivets
    rv = max(2, int(size * 0.035))
    rv_col = tuple(int(a * 0.8) for a in frame_l)
    rv_off = inset + max(2, int(size * 0.06))
    for rx, ry in ((rv_off, rv_off), (size - 1 - rv_off, rv_off), (rv_off, size - 1 - rv_off), (size - 1 - rv_off, size - 1 - rv_off)):
        draw_circle(base, rx, ry, rv, rv_col)

    # inner bevel highlight (top edge of panel) and shadow (bottom edge)
    bevel = tuple(min(int(a * 1.5), 255) for a in panel_l)
    for x in range(inset, size - inset):
        base[inset, x, 0:3] = np.array(bevel)
        base[inset, x, 3] = 255
    for x in range(inset, size - inset):
        base[size - 2 - inset, x, 0:3] = np.array([0, 0, 0])
        base[size - 2 - inset, x, 3] = 120

    # overlays (skip for static icon/research/unpowered)
    if variant in ("unpowered", "icon", "research", "gate"):
        return {"base": base, "glow": None, "spin": None, "spin_blur": None}

    glow_arr = np.zeros((size, size, 4), dtype=np.uint8)
    yy, xx = np.mgrid[0:size, 0:size]
    d = np.sqrt((xx - cx) ** 2 + (yy - cy) ** 2)
    R = size / 2.0
    a = np.exp(-(d / (R * 0.72)) ** 2)
    glow_arr[..., 0:3] = np.array(accent)
    glow_arr[..., 3] = (a * 70).astype(np.uint8)

    spin_arr = np.zeros((size, size, 4), dtype=np.uint8)
    sp_r = max(5, int(size * 0.19))
    draw_diamond(spin_arr, cx, cy, sp_r, accent, tuple(int(c * 0.55) for c in accent), alpha=150)

    spin_blur = to_img(spin_arr).filter(ImageFilter.GaussianBlur(2.5))
    spin_blur_arr = np.array(spin_blur, dtype=np.float32)
    spin_blur_arr[..., 3] *= 0.55
    spin_blur = to_img(spin_blur_arr.astype(np.uint8))

    return {"base": base, "glow": glow_arr, "spin": spin_arr, "spin_blur": spin_blur_arr.astype(np.uint8)}


def save_block(name, size, theme, variant, overlays=True):
    r = build_generator(size, theme, variant)
    save(name, r["base"])
    if overlays:
        save(name + "-glow", r["glow"])
        save(name + "-spin", r["spin"])
        save(name + "-spin-blur", r["spin_blur"])


# ---- themes -------------------------------------------------------------
# ore generator themes
ORE = {
    "copper":    dict(frame=("#9c7140", "#4f3921"), panel=("#3a2817", "#1e160c"), gem=("#ffdb5c", "#b48349"), accent="#ffb03c"),
    "lead":      dict(frame=("#7a8290", "#3a3f4a"), panel=("#2a2e36", "#181b20"), gem=("#e0e6f0", "#8a92a0"), accent="#aab6cc"),
    "coal":      dict(frame=("#4a4a52", "#26262b"), panel=("#222226", "#141417"), gem=("#e8e4d8", "#7a7a70"), accent="#88909a"),
    "titanium":  dict(frame=("#9aa3ac", "#474d54"), panel=("#33383e", "#1c2024"), gem=("#f2f8ff", "#9aa6b2"), accent="#c9d6e4"),
    "scrap":     dict(frame=("#7a7a6a", "#38382e"), panel=("#2c2c26", "#181813"), gem=("#d8d8c0", "#7d7d6a"), accent="#aab0a0"),
    "thorium":   dict(frame=("#8a5a7a", "#402a3a"), panel=("#301f30", "#191019"), gem=("#7dff9a", "#2f7d4a"), accent="#7dff9a"),
    "sand":      dict(frame=("#a08a5a", "#4a3c22"), panel=("#3a3120", "#1e1a10"), gem=("#f4e0a0", "#9a8448"), accent="#e8c878"),
    "beryllium": dict(frame=("#4a8a6a", "#1f3d2e"), panel=("#1a2e22", "#0e1913"), gem=("#8dffa8", "#3a8a56"), accent="#8dffa8"),
    "tungsten":  dict(frame=("#5a6a8a", "#262f42"), panel=("#1f2634", "#12141d"), gem=("#d8e0ff", "#6a76a0"), accent="#c0ccf0"),
}

LIQUID = {
    "water":     dict(frame=("#3a6a9a", "#1a3048"), panel=("#16243a", "#0d1520"), gem=("#9fd8ff", "#3a6a9a"), accent="#4aa0ff", liquid="#7fd0ff"),
    "ozone":     dict(frame=("#4a4a9a", "#1e1e4a"), panel=("#1a1a38", "#0e0e1f"), gem=("#c8b8ff", "#5a54a0"), accent="#8a80ff", liquid="#b8a8ff"),
    "cryofluid": dict(frame=("#2a7a7a", "#103438"), panel=("#123034", "#091c1e"), gem=("#a8f4ff", "#3aa0aa"), accent="#44e0e8", liquid="#9ff0f8"),
    "slag":      dict(frame=("#7a3420", "#381408"), panel=("#2a1208", "#180a04"), gem=("#ff9a3c", "#a84a14"), accent="#ff6a2a", liquid="#ff7a2a", crack="#ff6a2a", flame="#ffb03c"),
    "slug":      dict(frame=("#9a3a2a", "#421008"), panel=("#341008", "#1c0804"), gem=("#ff8a4a", "#b04a14"), accent="#ff4a2a", liquid="#ff6a2a", crack="#ff4a2a", flame="#ff9a4a"),
}

SYNTH = {
    "basic":    dict(frame=("#8a6a3a", "#3a2c14"), panel=("#2e2412", "#191206"), gem=("#f0d050", "#9a7a2a"), accent="#e8b040"),
    "refined":  dict(frame=("#7a8290", "#2e333c"), panel=("#242830", "#121418"), gem=("#e8f0ff", "#7d8aa0"), accent="#9fb2d8"),
    "advanced": dict(frame=("#3a5a7a", "#16263a"), panel=("#16202e", "#0c1118"), gem=("#7dff9a", "#2f7d4a"), accent="#7dff9a"),
}

UPGRADE = {
    "speed":      dict(frame=("#a08030", "#4a3410"), panel=("#3a2c10", "#1e1608"), gem=("#ffd85a", "#a0762a"), accent="#ffd85a"),
    "capacity":   dict(frame=("#50a8b8", "#1e4048"), panel=("#16303a", "#0c1a1e"), gem=("#b8e8ff", "#4a90a8"), accent="#50c0d0"),
    "output":     dict(frame=("#5a9a5a", "#204020"), panel=("#18301a", "#0c180e"), gem=("#9affb0", "#3a8a4a"), accent="#6ae080"),
    "efficiency": dict(frame=("#d07a50", "#5a2410"), panel=("#3a2010", "#1c1008"), gem=("#ffc89a", "#a05a2a"), accent="#f0a070"),
}


def gate_icon(name, theme):
    """Research-gate icon: dark plate with a gear ring around the center gem."""
    size = 32
    t = dict(theme)

    def dark(h, k):
        c = rgb(h)
        return "#%02x%02x%02x" % tuple(int(x * k) for x in c)

    t["frame"] = (dark(theme["frame"][0], 0.55), dark(theme["frame"][1], 0.55))
    t["panel"] = (dark(theme["panel"][0], 0.7), dark(theme["panel"][1], 0.7))
    r = build_generator(size, t, "gate")
    base = r["base"]
    accent = rgb(theme["accent"])
    cx = cy = 15.5
    # gear ring: 8 teeth around center
    R = 9
    for i in range(8):
        ang = np.deg2rad(i * 45)
        x = int(cx + np.cos(ang) * R)
        y = int(cy + np.sin(ang) * R)
        draw_circle(base, x, y, 2, accent, alpha=180)
    draw_circle(base, int(cx), int(cy), 4, accent, alpha=150)
    draw_diamond(base, cx, cy, 2, accent, tuple(int(c * 0.5) for c in accent))
    save(name, base)


def research_icon(name, theme):
    """Milestone icon: plate with a small document glyph + accent stamp."""
    size = 32
    r = build_generator(size, dict(theme), "research")
    base = r["base"]
    accent = rgb(theme["accent"])
    cx = cy = 15.5
    # document glyph: small rect
    for y in range(9, 23):
        for x in range(10, 23):
            if 11 <= x <= 22:
                base[y, x, 0:3] = np.array([min(255, int(c * 1.4)) for c in rgb(theme["panel"][0])])
                base[y, x, 3] = 255
    for i, yy in enumerate(range(12, 21, 3)):
        for x in range(12, 21):
            base[yy, x, 0:3] = np.array(accent)
            base[yy, x, 3] = 180
    draw_diamond(base, 22, 10, 3, accent, tuple(int(c * 0.5) for c in accent))
    save(name, base)


# ---- generate -----------------------------------------------------------
if __name__ == "__main__":
    np.random.seed(7)
    generated = []

    def note(path):
        generated.append(path)
        print("  " + path)

    print("Magma tiers (4x4, 128px):")
    for ore, th in ORE.items():
        for suffix in ("", "-glow", "-spin", "-spin-blur"):
            note(f"{ore}-gen-magma{suffix}.png")
        save_block(ore + "-gen-magma", 128, th, "magma")

    print("Liquid generators (3x3, 96px):")
    for lid, th in LIQUID.items():
        save_block(lid + "-gen", 96, th, "water" if lid in ("water", "ozone") else ("cryo" if lid == "cryofluid" else "magma"))
        for suffix in ("", "-glow", "-spin", "-spin-blur"):
            note(f"{lid}-gen{suffix}.png")
    # Erekir cryofluid generator: distinct block, distinct recipe, same visual family
    save_block("erekir-cryofluid-gen", 96, LIQUID["cryofluid"], "cryo")
    for suffix in ("", "-glow", "-spin", "-spin-blur"):
        note(f"erekir-cryofluid-gen{suffix}.png")

    print("Synthesizers (4x4, 128px):")
    for sid, th in SYNTH.items():
        save_block(sid + "-synthesizer", 128, th, "synthesizer")
        for suffix in ("", "-glow", "-spin", "-spin-blur"):
            note(f"{sid}-synthesizer{suffix}.png")

    print("Upgrade icons 4-10:")
    for line in ("speed", "capacity", "output", "efficiency"):
        start = {"speed": 4, "capacity": 4, "output": 3, "efficiency": 3}[line]
        for i in range(start, 11):
            save(f"generator-{line}-{i}", build_generator(32, UPGRADE[line], "icon")["base"])
            note(f"generator-{line}-{i}.png")

    print("Upgrade gates 4-10:")
    for line in ("speed", "capacity", "output", "efficiency"):
        start = {"speed": 4, "capacity": 4, "output": 3, "efficiency": 3}[line]
        for i in range(start, 11):
            gate_icon(f"upgrade-research-{line}-{i}", UPGRADE[line])
            note(f"upgrade-research-{line}-{i}.png")

    print("Research milestones (magma tiers):")
    for ore, th in ORE.items():
        for s in (1, 2, 3):
            research_icon(f"{ore}-research-5-{s}", th)
            note(f"{ore}-research-5-{s}.png")

    print("Research milestones (liquid gens):")
    for lid, th in LIQUID.items():
        for s in (1, 2, 3):
            research_icon(f"{lid}-research-{s}", th)
            note(f"{lid}-research-{s}.png")
    for s in (1, 2, 3):
        research_icon(f"erekir-cryofluid-research-{s}", LIQUID["cryofluid"])
        note(f"erekir-cryofluid-research-{s}.png")

    print("Research milestones (synthesizers):")
    for i, (sid, th) in enumerate(SYNTH.items(), start=1):
        for s in (1, 2, 3):
            research_icon(f"synthesizer-research-{i}-{s}", th)
            note(f"synthesizer-research-{i}-{s}.png")

    print(f"\nTotal generated: {len(generated)}")