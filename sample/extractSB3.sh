#!/bin/bash

LIST=`find . -name "*.sb3" | tr -d ' ' | tr '\n' ' '`
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

cp -rf internalapi /mnt/c/Users/n-tom/Desktop/touch/webSakura/tukurutch/
