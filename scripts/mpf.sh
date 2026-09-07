#!/usr/bin/env bash

# Exit immediately if a command exits with a non-zero status
set -e

# Check if folder name argument is provided
if [ -z "$1" ]; then
    echo "Usage: $(basename "$0") <folder_name>"
    exit 1
fi

# Sanitize folder name (strip carriage returns and trailing slashes for Windows/WSL compatibility)
NEW_FOLDER_NAME="$(printf '%s' "$1" | tr -d '\r' | sed 's|/*$||')"

if [ -z "$NEW_FOLDER_NAME" ]; then
    echo "Usage: $(basename "$0") <folder_name>"
    exit 1
fi

# Get the absolute path of the script's directory and project root
# Compatible with bash, sh, and zsh across Linux, WSL, and Windows (Git Bash/MSYS)
if [ -n "${BASH_SOURCE:-}" ]; then
    SCRIPT_PATH="$BASH_SOURCE"
else
    SCRIPT_PATH="$0"
fi
SCRIPT_DIR="$(cd "$(dirname "$SCRIPT_PATH")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

STARTER_DIR="$PROJECT_ROOT/starter"
PROJECTS_DIR="$PROJECT_ROOT/projects"
TARGET_DIR="$PROJECTS_DIR/$NEW_FOLDER_NAME"

# Check if starter folder exists
if [ ! -d "$STARTER_DIR" ]; then
    echo "Error: Starter directory '$STARTER_DIR' not found."
    exit 1
fi

# Ensure projects folder exists
if [ ! -d "$PROJECTS_DIR" ]; then
    mkdir -p "$PROJECTS_DIR"
fi

# Check if target folder already exists
if [ -e "$TARGET_DIR" ]; then
    echo "Error: Target directory 'projects/$NEW_FOLDER_NAME' already exists."
    exit 1
fi

# Cleanup target directory if script aborts before completion
SUCCESS=0
cleanup() {
    if [ "$SUCCESS" -ne 1 ] && [ -d "$TARGET_DIR" ]; then
        echo "Error during setup; cleaning up $TARGET_DIR..." >&2
        rm -rf "$TARGET_DIR"
    fi
}
trap cleanup EXIT

echo "Creating new project folder: projects/$NEW_FOLDER_NAME..."
mkdir -p "$TARGET_DIR"

echo "Copying starter template..."
# Copy all files including hidden ones (using starter/.)
# Try cp -a first (preserve permissions, timestamps, symlinks);
# fallback to cp -R if permission/ownership preservation fails (common on Windows NTFS/DrvFs mounts)
if ! cp -a "$STARTER_DIR"/. "$TARGET_DIR" 2>/dev/null; then
    cp -R "$STARTER_DIR"/. "$TARGET_DIR"
fi

SUCCESS=1
echo "Successfully created and initialized projects/$NEW_FOLDER_NAME."