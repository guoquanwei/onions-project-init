#!/bin/sh
echo $GO_PIPELINE_NAME
echo $GO_PIPELINE_COUNTER
VERSION=$GO_PIPELINE_COUNTER
echo $VERSION
ssh master@10.8.8.210 << EOF
PASSWORD=$(echo $(curl -s http://10.8.8.116:9200/teacher-school-config/docker-config/1) | awk -F '"' '{print$26}')
echo $PASSWORD | docker login --username=robot\$teacher --password-stdin docker.yc345.tv
docker container ps -a | grep 'docker.yc345.tv/teacherschool/robbstark' | awk '{print $1}' | xargs docker stop
docker container ps -a | grep 'docker.yc345.tv/teacherschool/robbstark' | awk '{print $1}' | xargs docker rm
echo "robbstark old container removed"
docker images -a | grep 'docker.yc345.tv/teacherschool/robbstark' | awk '{print $3}' | xargs docker rmi -f
echo "robbstark old images removed"
docker pull docker.yc345.tv/teacherschool/robbstark:$VERSION
docker logout
docker run -d -e NODE_ENV=development -p 3080:80 docker.yc345.tv/teacherschool/robbstark:$VERSION
echo "robbstark $VERSION runing"
