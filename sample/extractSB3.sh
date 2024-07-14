#!/bin/bash

LIST=`find . -name "0*.sb3" | tr -d ' ' | tr '\n' ' '`
rm internalapi/* internalapi/asset/*
for n in $LIST
do
  m=`echo $n | sed -e "s/\.\/\([^.]*\)\.[^.]*\.[^.]*\.[^.]*/\1/"`
  if [ "$m" != "$n" ]; then
    echo $m
    unzip -o -q $n -d internalapi
    cat internalapi/project.json | jq . > internalapi/$m
  fi
done

mv internalapi/*.wav internalapi/*.svg internalapi/*.png internalapi/asset/

rm /mnt/c/Users/n-tom/Desktop/web/webSakura/tukurutch/internalapi/*
cp -rfp internalapi /mnt/c/Users/n-tom/Desktop/web/webSakura/tukurutch/
