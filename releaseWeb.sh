#!/bin/bash
DIST=tukurutch
if [ $# -ne 0 ]; then
  DIST=$1
fi

cd sample
./extractSB3.sh
cd -

npm run build
cd build
gzip -c lib.min.js > lib.min.js.gz
cd -

cp -rp build/* ../../Desktop/touch/webSakura/$DIST/
