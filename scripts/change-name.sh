#!/bin/bash

if ! command -v jq &> /dev/null; then
  echo "Error: jq is required. Install with 'brew install jq' or 'sudo apt install jq'"
  exit 1
fi

if [ -z "$1" ]; then
  echo "Usage: npm run change-name <new-project-name>"
  exit 1
fi

OLD_NAME=$(jq -r '.name' package.json)
NEW_NAME=$1

find . -type f -not -path "./node_modules/*" -not -path "./.git/*" -exec grep -Iq . {} \; -print0 | xargs -0 sed -i '' "s/$OLD_NAME/$NEW_NAME/g"

jq --arg new_name "$NEW_NAME" '.name = $new_name' package.json > temp.json && mv temp.json package.json

echo "Project renamed to $NEW_NAME. Manually rename root folder if needed."