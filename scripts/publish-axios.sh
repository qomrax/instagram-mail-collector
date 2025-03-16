#!/bin/bash

if [ ! -d "nestjs-generated-axios" ]; then
    git clone https://github.com/qraxiss/nestjs-generated-axios
fi

npx openapi-typescript-codegen --input ./swagger.json --output ./nestjs-generated-axios --client axios

cd nestjs-generated-axios || exit 1

yarn install
yarn build

git add .


git commit -m "update"
git push origin $(git rev-parse --abbrev-ref HEAD)

cd ..