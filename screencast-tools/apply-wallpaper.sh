#!/usr/bin/env bash
set -e

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
MODE="${1:-standalone}"

if [ "$MODE" = "spanned" ]; then
    echo "Applying dual-monitor spanned wallpaper..."
    gsettings set org.gnome.desktop.background picture-uri "file://${DIR}/screencast-guide-spanned-5760x1600.png"
    gsettings set org.gnome.desktop.background picture-uri-dark "file://${DIR}/screencast-guide-spanned-5760x1600.png"
    gsettings set org.gnome.desktop.background picture-options "spanned"
else
    echo "Applying standalone 3840x1600 wallpaper to Dell 38\"..."
    gsettings set org.gnome.desktop.background picture-uri "file://${DIR}/screencast-guide-3840x1600.png"
    gsettings set org.gnome.desktop.background picture-uri-dark "file://${DIR}/screencast-guide-3840x1600.png"
    gsettings set org.gnome.desktop.background picture-options "zoom"
fi

echo "Done."
