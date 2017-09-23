#! /usr/bin/env bash
# author : owen-carter

echo "start to deploy spider-mzitu project..."
echo "you must installed the node and git"
git clone https://github.com/owen-carter/spider-mzitu.git
cd spider-mzitu
npm install
echo "deploy the mzitu success!"
npm run app




