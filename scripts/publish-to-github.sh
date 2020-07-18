#!/bin/bash
cat >~/.npmrc <<EOL
@dimensiondev:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NPM_AUTH_TOKEN}
EOL

COMMIT_HSAH=$(git rev-parse --short HEAD)
npm --no-git-tag-version version "0.0.0-$COMMIT_HSAH"
npm publish --tag unstable
