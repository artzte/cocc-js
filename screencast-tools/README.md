# Screencast Tools & Wallpaper Guide

Tools to generate and apply a custom screencast alignment wallpaper for the **Dell Inc. 38" (Dell
U3818DW)** ultrawide monitor.

---

## Overview & Display Layout

- **Display Resolution**: `3840 × 1600` (24:10 UWQHD+)
- **Screencast Capture Zone**: Center-left area with OS bar exclusion buffers
  - **Dimensions**: `1920 × 1080` (1080p FHD, 16:9 aspect ratio)
  - **Coordinates**: `x: 150 → 2070`, `y: 370 → 1450`
  - **Exclusion Margins**:
    - **Left Offset (150px)**: Excludes the Ubuntu Dock / application launcher.
    - **Bottom Offset (150px)**: Excludes the OS window list, taskbar, and bottom panel.
    - **Top Margin (370px)**: Excludes the GNOME top bar and provides staging room.
  - **Features**:
    - Camera viewfinder corner brackets with relative `(0, 0)`, `(1920, 0)`, `(0, 1080)`, and
      `(1920, 1080)` frame coordinates.
    - External screen coordinate labels at outer corners: `(150, 370)`, `(2070, 370)`,
      `(150, 1450)`, and `(2070, 1450)`.
    - External pixel ruler along top boundary (`y = 370`) and right boundary (`x = 2070`), plus
      subtle ticks along bottom and left.
    - Center reticle at `(960, 540)` (screen position `x = 1110, y = 910`).
    - Faint rule-of-thirds dashed guidelines and intersection crosses.
    - Nested `1280 × 720` (720p HD) alignment outline anchored in the bottom-left corner of the
      zone.
    - Dedicated badge pills indicating exclusion buffers and aspect ratio.
- **Staging / Notes Zone**: `1920 × 370` (top, `x: 150 → 2070`, `y: 0 → 370`)
  - Safe area outside the recording frame for teleprompters, lecture notes, and OBS controls.
- **Primary Workspace**: `1770 × 1600` (right column, `x: 2070 → 3840`)
  - Dedicated full-height area for code editor, browser preview, and devtools.

---

## OBS Studio Crop Configuration

When capturing the Dell 38" monitor in OBS Studio via a full screen capture source (PipeWire / X11),
add or update a **Crop/Pad** filter on the source with the following pixel values:

| Crop Side  | Pixels | Rationale                                                    |
| :--------- | :----- | :----------------------------------------------------------- |
| **Left**   | `150`  | Excludes OS dock and left screen margin                      |
| **Top**    | `370`  | Excludes GNOME top bar and staging area                      |
| **Right**  | `1770` | Excludes 1770px primary workspace (`3840 - 2070 = 1770`)     |
| **Bottom** | `150`  | Excludes bottom OS window list / panel (`1600 - 1450 = 150`) |

This produces an exact `1920 × 1080` pixel output matching your canvas 1:1 without scaling or
distortion.

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

The script automatically updates local repo copies and places fresh copies into `~/Pictures/` and
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

- **Dimensions & Placement**: Adjust `GUIDE_W`, `GUIDE_H`, `OFFSET_X`, and `OFFSET_BOTTOM` at the
  top of the file.
- **Colors & Theme**: Adjust `CYAN_MAIN`, `CYAN_BRIGHT`, `BG_CARD`, or `RED_REC` in the palette
  definition.
- **Grid Density**: Modify the step size in `range(GUIDE_X + 60, GUIDE_X + GUIDE_W, 60)` for tighter
  or wider alignment points.
