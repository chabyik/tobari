#!/bin/bash
source ./config.sh

docker rm -f $container_name
screen -S $container_name -d -m docker run --name $container_name -p $api_port:$api_port -p $web_port:$web_port $image_name:$image_version