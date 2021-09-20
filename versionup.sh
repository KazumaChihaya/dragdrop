#!/bin/bash
TAG=`git describe --tags`
sed -i -e "s/\"version\": \"[v0-9\.]*\",/\"version\": \"$TAG\",/" package.json
sed -i -e "s/npm-[v0-9\.]*-green/npm-$TAG-green/" README.md
