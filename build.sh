#!/bin/bash

cat introduction.md example1.md example2.md nextsteps.md > presentation.md
npx @marp-team/marp-cli presentation.md -o index.html
