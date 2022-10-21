#!/bin/bash

set -Eeu

rm -rf node_modules/@types/keyv

npm run build
