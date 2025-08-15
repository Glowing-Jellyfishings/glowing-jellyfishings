#!/bin/bash

set -e  # Exit on error
set -o pipefail

# Optional: cache Git credentials for smoother loop
git config --global credential.helper cache

for i in {21..100}; do
  folder="Server$i"
  echo "🚀 Setting up $folder..."

  # Create and enter folder
  mkdir -p "$folder"
  cd "$folder"

  # Initialize npm and install express
  npm init -y
  npm install express

  # Stage and commit
  git add .
  git commit -m "Initialize $folder with Express"

  # Push changes
  git push || echo "⚠️ Push failed for $folder. Check remote or credentials."

  # Return to root
  cd ..

  echo "✅ $folder setup complete."
done

echo "🎉 All folders processed!"
