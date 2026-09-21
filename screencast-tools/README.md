# Screencast Tools & Wallpaper Guide

Tools to generate and apply a custom screencast alignment wallpaper for the **Dell Inc. 38" (Dell
U3818DW)** ultrawide monitor.

---

## Overview & Display Layout

- **Display Resolution**: `3840 × 1600` (24:10 UWQHD+)
- **Screencast Capture Zone**: Lower-left quadrant
  - **Dimensions**: `1920 × 1080` (1080p FHD, 16:9 aspect ratio)
  - **Coordinates**: `x: 0 → 1920`, `y: 520 → 1600`
  - **Features**:
    - Camera viewfinder corner brackets and `(0, 0)`, `(1920, 0)`, `(0, 1080)`, `(1920, 1080)`
      corner labels.
    - External pixel ruler along top boundary (`y = 520`) and right boundary (`x = 1920`).
    - Center reticle at `(960, 540)` (screen position `x = 960, y = 1060`).
    - Faint rule-of-thirds dashed guidelines and intersection crosses.
    - Nested `1280 × 720` (720p HD) alignment outline in the bottom-left corner.
- **Staging / Notes Zone**: `1920 × 520` (top-left, `y: 0 → 520`)
  - Safe area outside the recording frame for teleprompters, lecture notes, and OBS controls.
- **Primary Workspace**: `1920 × 1600` (right half, `x: 1920 → 3840`)
  - Dedicated full-height area for code editor, browser preview, and devtools.

---

## Prerequisites

- Python 3
- Pillow (`PIL`) & NumPy:
  ```bash
  sudo apt install python3-pil python3-numpy
  # or: pip install pillow numpy
  ```
- Ubuntu font package (default on Ubuntu): `/usr/share/fonts/truetype/ubuntu/Ubuntu-B.ttf`,
  `Ubuntu-M.ttf`, `Ubuntu-R.ttf`, `UbuntuMono-B.ttf`, `UbuntuMono-R.ttf`

---

## 1. How to Regenerate the Images

Run the Python generator script from within this directory:

```bash
cd /home/eric/src/cocc-js/course/screencast-tools
python3 generate_wallpaper.py
```

This generates:

1. `screencast-guide-3840x1600.png`: Standalone 1:1 pixel-perfect wallpaper for the 38" Dell
   monitor.
2. `screencast-guide-spanned-5760x1600.png`: Spanned dual-monitor canvas (integrating your laptop
   screen on the left and the Dell 38" on the right).

The script also automatically places fresh copies into `~/Pictures/` and
`~/.local/share/backgrounds/`.

---

## 2. How to Place / Apply the Wallpaper

### Method A: Using the Included Shell Script (Recommended)

To apply the standalone 38" wallpaper:

```bash
./apply-wallpaper.sh
```

To apply the spanned dual-monitor wallpaper:

```bash
./apply-wallpaper.sh spanned
```

### Method B: Using `gsettings` Directly

**Standalone Mode (Dell 38" Display)**:

```bash
DIR="$(pwd)"
gsettings set org.gnome.desktop.background picture-uri "file://${DIR}/screencast-guide-3840x1600.png"
gsettings set org.gnome.desktop.background picture-uri-dark "file://${DIR}/screencast-guide-3840x1600.png"
gsettings set org.gnome.desktop.background picture-options "zoom"
```

**Spanned Mode (Laptop + Dell 38")**:

```bash
DIR="$(pwd)"
gsettings set org.gnome.desktop.background picture-uri "file://${DIR}/screencast-guide-spanned-5760x1600.png"
gsettings set org.gnome.desktop.background picture-uri-dark "file://${DIR}/screencast-guide-spanned-5760x1600.png"
gsettings set org.gnome.desktop.background picture-options "spanned"
```

### Method C: Via GNOME Settings UI

1. Open **Settings** → **Appearance**.
2. Click **Add Picture...** in the Background section.
3. Select `screencast-guide-3840x1600.png` from this folder or `~/Pictures/`.

---

## Customizing Layout or Colors

Edit `generate_wallpaper.py`:

- **Dimensions & Placement**: Adjust `GUIDE_W`, `GUIDE_H`, `GUIDE_X`, and `GUIDE_Y` at the top of
  the file.
- **Colors & Theme**: Adjust `CYAN_MAIN`, `CYAN_BRIGHT`, `BG_CARD`, or `RED_REC` in the palette
  definition.
- **Grid Density**: Modify the step size in `range(GUIDE_X + 60, GUIDE_X + GUIDE_W, 60)` for tighter
  or wider alignment points.
