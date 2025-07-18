#!/bin/bash
source ./config.sh

docker rmi -f $image_name:$image_version
docker build -t $image_name:$image_version ..