#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Get the absolute path of the script's directory and project root
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

STARTER_DIR="$PROJECT_ROOT/starter"
PROJECTS_DIR="$PROJECT_ROOT/projects"

# Check if folder name argument is provided
if [ -z "$1" ]; then
    echo "Usage: $(basename "$0") <folder_name>"
    exit 1
fi

NEW_FOLDER_NAME="$1"
TARGET_DIR="$PROJECTS_DIR/$NEW_FOLDER_NAME"

# Check if starter folder exists
if [ ! -d "$STARTER_DIR" ]; then
    echo "Error: Starter directory '$STARTER_DIR' not found."
    exit 1
fi

# Check if projects folder exists
if [ ! -d "$PROJECTS_DIR" ]; then
    echo "Error: Projects directory '$PROJECTS_DIR' not found."
    exit 1
fi

# Check if target folder already exists
if [ -e "$TARGET_DIR" ]; then
    echo "Error: Target directory 'projects/$NEW_FOLDER_NAME' already exists."
    exit 1
fi

echo "Creating new project folder: projects/$NEW_FOLDER_NAME..."
mkdir -p "$TARGET_DIR"

echo "Copying starter template..."
# Copy all files including hidden ones (using starter/.)
# We use cp -a to preserve permissions, timestamps, symlinks, etc.
cp -a "$STARTER_DIR"/. "$TARGET_DIR"

echo "Successfully created and initialized projects/$NEW_FOLDER_NAME."
