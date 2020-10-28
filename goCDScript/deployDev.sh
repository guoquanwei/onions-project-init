#! /bin/sh
echo $GO_PIPELINE_NAME
echo $GO_PIPELINE_COUNTER
VERSION=$GO_PIPELINE_COUNTER
PROJECT=robbstark
REMOTE=docker.yc345.tv/teacherschool/
PASSWORD=$(echo $(curl -s http://10.8.8.116:9200/teacher-school-config/docker-config/1) | awk -F '"' '{print$26}')
echo $PASSWORD | docker login --username=robot\$teacher --password-stdin docker.yc345.tv
echo $VERSION
docker build -t $REMOTE$PROJECT .
docker push $REMOTE$PROJECT

docker tag $REMOTE$PROJECT $REMOTE$PROJECT:$VERSION
docker push $REMOTE$PROJECT:$VERSION
echo "uploaded image $REMOTE$PROJECT:$VERSION"

docker rmi -f $(docker images $REMOTE$PROJECT -q)
docker images

docker logout
exit 0
