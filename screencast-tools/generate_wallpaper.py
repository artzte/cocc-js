import os
import math
import numpy as np
from PIL import Image, ImageDraw, ImageFont

WIDTH = 3840
HEIGHT = 1600

# Screencast region: 1920x1080 (1080p FHD)
GUIDE_W = 1920
GUIDE_H = 1080

# 150px offsets from left and bottom edges to exclude OS app bars
# (Ubuntu left dock/launcher and bottom window list/panel)
OFFSET_X = 150
OFFSET_BOTTOM = 150

GUIDE_X = OFFSET_X                               # 150
GUIDE_Y = HEIGHT - GUIDE_H - OFFSET_BOTTOM       # 1600 - 1080 - 150 = 370

def create_dell_wallpaper():
    print(f"Generating refined background canvas for Dell U3818DW ({WIDTH}x{HEIGHT})...")
    print(f"Screencast Zone: {GUIDE_W}x{GUIDE_H} at x={GUIDE_X}, y={GUIDE_Y} (offset 150px from left & bottom)")
    y_coords, x_coords = np.indices((HEIGHT, WIDTH), dtype=np.float32)

    # Ambient radial illumination focused slightly toward workspace
    dx = (x_coords - 2400) / WIDTH
    dy = (y_coords - 600) / HEIGHT
    radial_dist = np.sqrt(dx * dx + dy * dy)
    ambient = np.clip(1.0 - radial_dist * 0.75, 0.0, 1.0)

    # Deep slate base (#0b0d13 -> #121520)
    r = (10 + ambient * 10).astype(np.uint8)
    g = (13 + ambient * 12).astype(np.uint8)
    b = (18 + ambient * 16).astype(np.uint8)

    # Screencast zone slightly elevated dark tint (#151824)
    mask_guide = (
        (x_coords >= GUIDE_X) & (x_coords < GUIDE_X + GUIDE_W) &
        (y_coords >= GUIDE_Y) & (y_coords < GUIDE_Y + GUIDE_H)
    )
    r[mask_guide] = (r[mask_guide] + 6).astype(np.uint8)
    g[mask_guide] = (g[mask_guide] + 7).astype(np.uint8)
    b[mask_guide] = (b[mask_guide] + 11).astype(np.uint8)

    # Subtle vignette around the far edges
    edge_dist_x = np.minimum(x_coords, WIDTH - 1 - x_coords) / 300.0
    edge_dist_y = np.minimum(y_coords, HEIGHT - 1 - y_coords) / 300.0
    edge_factor = np.clip(np.minimum(edge_dist_x, edge_dist_y), 0.7, 1.0)
    r = (r * edge_factor).astype(np.uint8)
    g = (g * edge_factor).astype(np.uint8)
    b = (b * edge_factor).astype(np.uint8)

    img_array = np.dstack([r, g, b])
    img = Image.fromarray(img_array, mode='RGB')
    draw = ImageDraw.Draw(img, "RGBA")

    # Font definitions
    FONT_DIR = "/usr/share/fonts/truetype/ubuntu"
    font_bold_22 = ImageFont.truetype(f"{FONT_DIR}/Ubuntu-B.ttf", 22)
    font_bold_18 = ImageFont.truetype(f"{FONT_DIR}/Ubuntu-B.ttf", 18)
    font_med_17  = ImageFont.truetype(f"{FONT_DIR}/Ubuntu-M.ttf", 17)
    font_reg_13  = ImageFont.truetype(f"{FONT_DIR}/Ubuntu-R.ttf", 13)
    font_mono_b  = ImageFont.truetype(f"{FONT_DIR}/UbuntuMono-B.ttf", 17)
    font_mono_r  = ImageFont.truetype(f"{FONT_DIR}/UbuntuMono-R.ttf", 15)
    font_mono_sm = ImageFont.truetype(f"{FONT_DIR}/UbuntuMono-R.ttf", 13)

    # Palette
    CYAN_MAIN       = (56, 189, 248, 255)       # #38bdf8
    CYAN_BRIGHT     = (125, 211, 252, 255)      # #7dd3fc
    CYAN_GLOW       = (56, 189, 248, 50)
    WHITE_BRIGHT    = (255, 255, 255, 255)
    WHITE_DIM       = (241, 245, 249, 210)
    SLATE_LIGHT     = (203, 213, 225, 200)
    SLATE_MID       = (148, 163, 184, 160)
    SLATE_MUTED     = (100, 116, 139, 140)
    SLATE_DARK      = (51, 65, 85, 140)
    RED_REC         = (239, 68, 68, 255)        # #ef4444
    RED_GLOW        = (239, 68, 68, 80)
    BG_CARD         = (20, 26, 40, 210)

    # 1. Background dot grid inside screencast zone
    for x in range(GUIDE_X + 60, GUIDE_X + GUIDE_W, 60):
        for y in range(GUIDE_Y + 60, GUIDE_Y + GUIDE_H, 60):
            draw.point((x, y), fill=(148, 163, 184, 28))
            draw.point((x + 1, y), fill=(148, 163, 184, 20))
            draw.point((x, y + 1), fill=(148, 163, 184, 20))

    # 2. Rule of Thirds lines (dashed)
    thirds_x = [GUIDE_X + 640, GUIDE_X + 1280]
    for tx in thirds_x:
        for y in range(GUIDE_Y + 12, GUIDE_Y + GUIDE_H - 12, 16):
            draw.line([(tx, y), (tx, y + 8)], fill=(56, 189, 248, 45), width=1)

    thirds_y = [GUIDE_Y + 360, GUIDE_Y + 720]
    for ty in thirds_y:
        for x in range(GUIDE_X + 12, GUIDE_X + GUIDE_W - 12, 16):
            draw.line([(x, ty), (x + 8, ty)], fill=(56, 189, 248, 45), width=1)

    # Intersection crosses
    for tx in thirds_x:
        for ty in thirds_y:
            draw.line([(tx - 8, ty), (tx + 8, ty)], fill=(56, 189, 248, 100), width=1)
            draw.line([(tx, ty - 8), (tx, ty + 8)], fill=(56, 189, 248, 100), width=1)

    # 3. 720p HD Nested Guide (1280 × 720) anchored in bottom-left corner of screencast zone
    hd_w = 1280
    hd_h = 720
    hd_x = GUIDE_X + hd_w
    hd_y = GUIDE_Y + GUIDE_H - hd_h
    for x in range(GUIDE_X + 10, hd_x, 16):
        draw.line([(x, hd_y), (x + 8, hd_y)], fill=(148, 163, 184, 55), width=1)
    for y in range(hd_y, GUIDE_Y + GUIDE_H - 10, 16):
        draw.line([(hd_x, y), (hd_x, y + 8)], fill=(148, 163, 184, 55), width=1)
    draw.text((hd_x - 170, hd_y + 8), "720p HD (1280 × 720)", font=font_mono_sm, fill=(148, 163, 184, 110))

    # 4. Center Reticle (x = 960, y = 540 inside frame)
    cx = GUIDE_X + (GUIDE_W // 2)
    cy = GUIDE_Y + (GUIDE_H // 2)
    draw.arc([(cx - 24, cy - 24), (cx + 24, cy + 24)], start=0, end=360, fill=(56, 189, 248, 120), width=1)
    draw.arc([(cx - 48, cy - 48), (cx + 48, cy + 48)], start=0, end=360, fill=(56, 189, 248, 40), width=1)
    draw.line([(cx - 40, cy), (cx - 8, cy)], fill=(56, 189, 248, 180), width=2)
    draw.line([(cx + 8, cy), (cx + 40, cy)], fill=(56, 189, 248, 180), width=2)
    draw.line([(cx, cy - 40), (cx, cy - 8)], fill=(56, 189, 248, 180), width=2)
    draw.line([(cx, cy + 8), (cx, cy + 40)], fill=(56, 189, 248, 180), width=2)
    draw.ellipse([(cx - 3, cy - 3), (cx + 3, cy + 3)], fill=WHITE_BRIGHT)
    draw.text((cx - 52, cy + 28), "CENTER (960, 540)", font=font_mono_sm, fill=(125, 211, 252, 140))

    # 5. Boundary Framing for Screencast Guide (All 4 borders)
    # Outer glow
    draw.rectangle(
        [(GUIDE_X - 1, GUIDE_Y - 1), (GUIDE_X + GUIDE_W + 1, GUIDE_Y + GUIDE_H + 1)],
        outline=CYAN_GLOW,
        width=2
    )
    # Main boundary line
    draw.rectangle(
        [(GUIDE_X, GUIDE_Y), (GUIDE_X + GUIDE_W, GUIDE_Y + GUIDE_H)],
        outline=CYAN_MAIN,
        width=3
    )
    # Inner glow
    draw.rectangle(
        [(GUIDE_X + 2, GUIDE_Y + 2), (GUIDE_X + GUIDE_W - 2, GUIDE_Y + GUIDE_H - 2)],
        outline=CYAN_GLOW,
        width=2
    )

    # Ruler ticks along top boundary (y = GUIDE_Y)
    for rel_x in range(100, GUIDE_W, 100):
        x = GUIDE_X + rel_x
        draw.line([(x, GUIDE_Y - 8), (x, GUIDE_Y)], fill=CYAN_BRIGHT, width=1)
        if rel_x % 200 == 0:
            val_str = str(rel_x)
            tb = font_mono_sm.getbbox(val_str)
            tw = tb[2] - tb[0]
            draw.text((x - tw // 2, GUIDE_Y - 22), val_str, font=font_mono_sm, fill=(148, 163, 184, 160))
    for rel_x in range(50, GUIDE_W, 100):
        x = GUIDE_X + rel_x
        draw.line([(x, GUIDE_Y - 4), (x, GUIDE_Y)], fill=SLATE_MID, width=1)

    # Ruler ticks along right boundary (x = GUIDE_X + GUIDE_W)
    for rel_y in range(100, GUIDE_H, 100):
        y = GUIDE_Y + rel_y
        draw.line([(GUIDE_X + GUIDE_W, y), (GUIDE_X + GUIDE_W + 8, y)], fill=CYAN_BRIGHT, width=1)
        if rel_y % 200 == 0:
            val_str = str(rel_y)
            tb = font_mono_sm.getbbox(val_str)
            th_num = tb[3] - tb[1]
            draw.text((GUIDE_X + GUIDE_W + 12, y - th_num // 2 - 2), val_str, font=font_mono_sm, fill=(148, 163, 184, 160))
    for rel_y in range(50, GUIDE_H, 100):
        y = GUIDE_Y + rel_y
        draw.line([(GUIDE_X + GUIDE_W, y), (GUIDE_X + GUIDE_W + 4, y)], fill=SLATE_MID, width=1)

    # Subtle ruler ticks along left boundary (x = GUIDE_X)
    for rel_y in range(100, GUIDE_H, 100):
        y = GUIDE_Y + rel_y
        draw.line([(GUIDE_X - 6, y), (GUIDE_X, y)], fill=CYAN_BRIGHT, width=1)
    for rel_y in range(50, GUIDE_H, 100):
        y = GUIDE_Y + rel_y
        draw.line([(GUIDE_X - 3, y), (GUIDE_X, y)], fill=SLATE_MID, width=1)

    # Subtle ruler ticks along bottom boundary (y = GUIDE_Y + GUIDE_H)
    for rel_x in range(100, GUIDE_W, 100):
        x = GUIDE_X + rel_x
        draw.line([(x, GUIDE_Y + GUIDE_H), (x, GUIDE_Y + GUIDE_H + 6)], fill=CYAN_BRIGHT, width=1)
    for rel_x in range(50, GUIDE_W, 100):
        x = GUIDE_X + rel_x
        draw.line([(x, GUIDE_Y + GUIDE_H), (x, GUIDE_Y + GUIDE_H + 3)], fill=SLATE_MID, width=1)

    # 6. Viewfinder Corner Brackets
    arm = 60
    th = 4
    bracket_col = WHITE_BRIGHT

    # Top-Left Bracket
    draw.line([(GUIDE_X + 4, GUIDE_Y + 4), (GUIDE_X + 4 + arm, GUIDE_Y + 4)], fill=bracket_col, width=th)
    draw.line([(GUIDE_X + 4, GUIDE_Y + 4), (GUIDE_X + 4, GUIDE_Y + 4 + arm)], fill=bracket_col, width=th)

    # Top-Right Bracket
    draw.line([(GUIDE_X + GUIDE_W - 4 - arm, GUIDE_Y + 4), (GUIDE_X + GUIDE_W - 4, GUIDE_Y + 4)], fill=bracket_col, width=th)
    draw.line([(GUIDE_X + GUIDE_W - 4, GUIDE_Y + 4), (GUIDE_X + GUIDE_W - 4, GUIDE_Y + 4 + arm)], fill=bracket_col, width=th)

    # Bottom-Left Bracket
    draw.line([(GUIDE_X + 4, GUIDE_Y + GUIDE_H - 4), (GUIDE_X + 4 + arm, GUIDE_Y + GUIDE_H - 4)], fill=bracket_col, width=th)
    draw.line([(GUIDE_X + 4, GUIDE_Y + GUIDE_H - 4 - arm), (GUIDE_X + 4, GUIDE_Y + GUIDE_H - 4)], fill=bracket_col, width=th)

    # Bottom-Right Bracket
    draw.line([(GUIDE_X + GUIDE_W - 4 - arm, GUIDE_Y + GUIDE_H - 4), (GUIDE_X + GUIDE_W - 4, GUIDE_Y + GUIDE_H - 4)], fill=bracket_col, width=th)
    draw.line([(GUIDE_X + GUIDE_W - 4, GUIDE_Y + GUIDE_H - 4 - arm), (GUIDE_X + GUIDE_W - 4, GUIDE_Y + GUIDE_H - 4)], fill=bracket_col, width=th)

    # Inner Coordinate Labels (Frame-relative coordinates: 0..1920, 0..1080)
    draw.text((GUIDE_X + 18, GUIDE_Y + 16), "(0, 0)", font=font_mono_b, fill=CYAN_BRIGHT)
    draw.text((GUIDE_X + GUIDE_W - 130, GUIDE_Y + 16), "(1920, 0)", font=font_mono_b, fill=CYAN_BRIGHT)
    draw.text((GUIDE_X + 18, GUIDE_Y + GUIDE_H - 34), "(0, 1080)", font=font_mono_b, fill=CYAN_BRIGHT)
    draw.text((GUIDE_X + GUIDE_W - 146, GUIDE_Y + GUIDE_H - 34), "(1920, 1080)", font=font_mono_b, fill=CYAN_BRIGHT)

    # Outer Screen Coordinate Labels (Absolute screen coordinates for OBS / window managers)
    draw.text((GUIDE_X, GUIDE_Y - 22), f"SCREEN ({GUIDE_X}, {GUIDE_Y})", font=font_mono_sm, fill=SLATE_MUTED)
    draw.text((GUIDE_X + GUIDE_W - 150, GUIDE_Y - 22), f"SCREEN ({GUIDE_X + GUIDE_W}, {GUIDE_Y})", font=font_mono_sm, fill=SLATE_MUTED)
    draw.text((GUIDE_X, GUIDE_Y + GUIDE_H + 12), f"SCREEN ({GUIDE_X}, {GUIDE_Y + GUIDE_H})", font=font_mono_sm, fill=SLATE_MUTED)
    draw.text((GUIDE_X + GUIDE_W - 160, GUIDE_Y + GUIDE_H + 12), f"SCREEN ({GUIDE_X + GUIDE_W}, {GUIDE_Y + GUIDE_H})", font=font_mono_sm, fill=SLATE_MUTED)

    # 7. Sleek Floating Header Badge Pill
    pill_w = 700
    pill_h = 48
    pill_x = cx - (pill_w // 2)
    pill_y = GUIDE_Y + 22
    pill_r = 24

    draw.rounded_rectangle(
        [(pill_x - 1, pill_y - 1), (pill_x + pill_w + 1, pill_y + pill_h + 1)],
        radius=pill_r,
        fill=(15, 23, 42, 255),
        outline=CYAN_MAIN,
        width=2
    )

    rec_cx = pill_x + 30
    rec_cy = pill_y + (pill_h // 2)
    draw.ellipse([(rec_cx - 8, rec_cy - 8), (rec_cx + 8, rec_cy + 8)], fill=RED_REC)
    draw.ellipse([(rec_cx - 12, rec_cy - 12), (rec_cx + 12, rec_cy + 12)], outline=RED_GLOW, width=2)

    txt_dim = "1920 × 1080"
    txt_desc = "•  1080p FHD SCREENCAST ZONE"
    draw.text((pill_x + 52, pill_y + 11), txt_dim, font=font_bold_22, fill=WHITE_BRIGHT)
    bbox_dim = font_bold_22.getbbox(txt_dim)
    w_dim = bbox_dim[2] - bbox_dim[0]
    draw.text((pill_x + 52 + w_dim + 12, pill_y + 13), txt_desc, font=font_med_17, fill=CYAN_BRIGHT)

    # 16:9 Aspect Ratio Tag
    ratio_pill_w = 110
    ratio_pill_x = pill_x + pill_w + 14
    draw.rounded_rectangle(
        [(ratio_pill_x, pill_y), (ratio_pill_x + ratio_pill_w, pill_y + pill_h)],
        radius=pill_r,
        fill=BG_CARD,
        outline=SLATE_DARK,
        width=1
    )
    draw.text((ratio_pill_x + 20, pill_y + 12), "16 : 9", font=font_bold_22, fill=SLATE_LIGHT)

    # 8. Top-Left Zone (Staging / Notes: 1920 × 370)
    # Aligned with screencast guide at x=GUIDE_X to clear the left dock
    staging_card_w = 540
    staging_card_h = 76
    staging_card_x = GUIDE_X
    staging_card_y = 100
    draw.rounded_rectangle(
        [(staging_card_x, staging_card_y), (staging_card_x + staging_card_w, staging_card_y + staging_card_h)],
        radius=12,
        fill=BG_CARD,
        outline=SLATE_DARK,
        width=1
    )
    draw.line([(staging_card_x, staging_card_y + 12), (staging_card_x, staging_card_y + staging_card_h - 12)], fill=CYAN_MAIN, width=4)
    draw.text((staging_card_x + 18, staging_card_y + 12), "STAGING / LECTURE NOTES", font=font_bold_18, fill=WHITE_DIM)
    draw.text((staging_card_x + 18, staging_card_y + 42), f"{GUIDE_W} × {GUIDE_Y} • Safe zone for teleprompter, outline & OBS controls", font=font_reg_13, fill=SLATE_MID)

    # 9. Divider between Screencast Column and Workspace
    div_x = GUIDE_X + GUIDE_W  # 2070
    draw.text((div_x + 8, 22), f"x = {div_x}", font=font_mono_sm, fill=(100, 116, 139, 140))
    for y in range(40, GUIDE_Y - 14, 12):
        draw.line([(div_x, y), (div_x, y + 6)], fill=(71, 85, 105, 120), width=1)

    for y in range(GUIDE_Y + GUIDE_H + 14, HEIGHT - 40, 12):
        draw.line([(div_x, y), (div_x, y + 6)], fill=(71, 85, 105, 120), width=1)

    # 10. Right Half Zone (Workspace / Secondary Tools: 1770 × 1600)
    ws_w = WIDTH - div_x  # 1770
    ws_card_w = 560
    ws_card_h = 76
    ws_card_x = div_x + 60  # 2130
    ws_card_y = staging_card_y
    draw.rounded_rectangle(
        [(ws_card_x, ws_card_y), (ws_card_x + ws_card_w, ws_card_y + ws_card_h)],
        radius=12,
        fill=BG_CARD,
        outline=SLATE_DARK,
        width=1
    )
    draw.line([(ws_card_x, ws_card_y + 12), (ws_card_x, ws_card_y + ws_card_h - 12)], fill=(99, 102, 241, 255), width=4)
    draw.text((ws_card_x + 18, ws_card_y + 12), "PRIMARY WORKSPACE / CODE EDITOR", font=font_bold_18, fill=WHITE_DIM)
    draw.text((ws_card_x + 18, ws_card_y + 42), f"{ws_w} × {HEIGHT} • Full-height zone for IDE, browser preview & devtools", font=font_reg_13, fill=SLATE_MID)

    # Workspace corner brackets
    r_arm = 45
    draw.line([(WIDTH - 24 - r_arm, 24), (WIDTH - 24, 24)], fill=SLATE_DARK, width=2)
    draw.line([(WIDTH - 24, 24), (WIDTH - 24, 24 + r_arm)], fill=SLATE_DARK, width=2)
    draw.line([(WIDTH - 24 - r_arm, HEIGHT - 24), (WIDTH - 24, HEIGHT - 24)], fill=SLATE_DARK, width=2)
    draw.line([(WIDTH - 24, HEIGHT - 24 - r_arm), (WIDTH - 24, HEIGHT - 24)], fill=SLATE_DARK, width=2)

    # Hardware Specs Tag in bottom-right
    spec_label = "DELL U3818DW  •  3840 × 1600  (24:10 UWQHD+)"
    bbox_spec = font_mono_r.getbbox(spec_label)
    spec_w = bbox_spec[2] - bbox_spec[0]
    draw.text((WIDTH - spec_w - 44, HEIGHT - 42), spec_label, font=font_mono_r, fill=SLATE_MUTED)

    # 11. OS App Bar Exclusion Indicators (Left Dock & Bottom Bar)
    # Bottom margin badge
    bm_pill_w = 520
    bm_pill_h = 36
    bm_x = cx - (bm_pill_w // 2)
    bm_y = GUIDE_Y + GUIDE_H + 34
    draw.rounded_rectangle(
        [(bm_x, bm_y), (bm_x + bm_pill_w, bm_y + bm_pill_h)],
        radius=8,
        fill=BG_CARD,
        outline=SLATE_DARK,
        width=1
    )
    draw.text((bm_x + 20, bm_y + 10), f"▼  OS APP BAR EXCLUSION BUFFER  •  {OFFSET_BOTTOM}px BOTTOM MARGIN", font=font_mono_sm, fill=SLATE_MID)

    # Left margin badge (Dock buffer)
    dock_card_w = 126
    dock_card_h = 36
    dock_x = (GUIDE_X - dock_card_w) // 2  # (150 - 126) // 2 = 12
    dock_y = cy - (dock_card_h // 2)
    draw.rounded_rectangle(
        [(dock_x, dock_y), (dock_x + dock_card_w, dock_y + dock_card_h)],
        radius=8,
        fill=BG_CARD,
        outline=SLATE_DARK,
        width=1
    )
    draw.text((dock_x + 12, dock_y + 10), f"◀  {OFFSET_X}px BUFFER", font=font_mono_sm, fill=SLATE_MID)

    return img

def create_spanned_wallpaper(dell_img):
    print("Generating 5760x1600 spanned wallpaper (Laptop eDP-1 + Dell DP-2)...")
    # Total canvas: 5760 x 1600
    # Left: 0..1920 (eDP-1, y=118..1318)
    # Right: 1920..5760 (DP-2, y=0..1600)
    spanned = Image.new("RGB", (5760, 1600), (12, 14, 20))

    # Paste Ubuntu wallpaper on left if available, resized to fit 1920x1600 or 1920x1200
    ubuntu_bg_path = "/usr/share/backgrounds/ubuntu-wallpaper-d.png"
    if os.path.exists(ubuntu_bg_path):
        u_img = Image.open(ubuntu_bg_path)
        u_scaled = u_img.resize((1920, 1600), Image.Resampling.LANCZOS)
        spanned.paste(u_scaled, (0, 0))
    else:
        pass

    # Paste Dell image on the right (x = 1920)
    spanned.paste(dell_img, (1920, 0))
    return spanned

if __name__ == "__main__":
    SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))

    # Generate Dell image
    dell_img = create_dell_wallpaper()

    # Save standalone wallpaper to repo directory, Pictures, and backgrounds
    out_targets = [
        os.path.join(SCRIPT_DIR, "screencast-guide-3840x1600.png"),
        os.path.expanduser("~/Pictures/screencast-guide-3840x1600.png"),
        os.path.expanduser("~/.local/share/backgrounds/screencast-guide-3840x1600.png")
    ]

    for target in out_targets:
        print(f"Saving standalone wallpaper to {target}...")
        os.makedirs(os.path.dirname(target), exist_ok=True)
        dell_img.save(target, "PNG", optimize=True)

    # Generate spanned image
    spanned_img = create_spanned_wallpaper(dell_img)
    spanned_targets = [
        os.path.join(SCRIPT_DIR, "screencast-guide-spanned-5760x1600.png"),
        os.path.expanduser("~/Pictures/screencast-guide-spanned-5760x1600.png"),
        os.path.expanduser("~/.local/share/backgrounds/screencast-guide-spanned-5760x1600.png")
    ]

    for target in spanned_targets:
        print(f"Saving spanned wallpaper to {target}...")
        os.makedirs(os.path.dirname(target), exist_ok=True)
        spanned_img.save(target, "PNG", optimize=True)

    # Generate preview in current conversation brain dir if available
    conv_brain = "/home/eric/.gemini/antigravity-cli/brain/942d2051-ac0f-4b55-a598-844c273b26ab"
    if os.path.isdir(conv_brain):
        preview_path = os.path.join(conv_brain, "preview-screencast-guide.png")
        print(f"Saving preview to {preview_path}...")
        preview_img = dell_img.resize((1280, 533), Image.Resampling.LANCZOS)
        preview_img.save(preview_path, "PNG")

    print("All files successfully generated!")
