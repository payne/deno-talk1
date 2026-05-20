#!/bin/bash

cat introduction.md history.md setup.md example1.md example2.md nextsteps.md > presentation.md
npx @marp-team/marp-cli presentation.md -o index.html
