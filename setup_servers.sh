#!/bin/bash

# Exit on error
set -e

# Loop through Server11 to Server20
for i in {11..20}; do
  folder="Server$i"
  echo "🔧 Creating $folder..."

  # Create folder and navigate into it
  mkdir "$folder"
  cd "$folder"

  # Initialize npm and install express
  npm init -y
  npm install express

  # Stage and commit changes
  git add .
  git commit -m "Initialize $folder with Express"

  # Push changes
  git push

  # Return to root
  cd ..
done

echo "✅ All servers initialized and synced!"
