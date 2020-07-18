#!/bin/bash
npm config set @dimensiondev:registry https://npm.pkg.github.com
COMMIT_HSAH=$(git rev-parse --short HEAD)
npm --no-git-tag-version version "0.0.0-$COMMIT_HSAH"
npm publish --tag unstable
