# FROM docker.yc345.tv/teacherschool/node:12.11.0-alpine_b_base
FROM node:12.16.1-alpine
RUN apk --update add tzdata && cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && echo "Asia/Shanghai" > /etc/timezone && apk del tzdata
# RUN yum -y install gcc gcc-c++ kernel-devel wget sed make sudo
# USER root
# RUN su root
# ENV DIR=/root/src/service
# WORKDIR $DIR
# RUN wget https://nodejs.org/dist/v10.17.0/node-v10.17.0-linux-x64.tar.gz
# RUN tar -xzvf ./node-v10.17.0-linux-x64.tar.gz
# RUN rm ./node-v10.17.0-linux-x64.tar.gz
# RUN ln -s $DIR/node-v10.17.0-linux-x64/bin/node /usr/local/bin/node
# RUN ln -s $DIR/node-v10.17.0-linux-x64/bin/npm /usr/local/bin/npm
# RUN cp  /usr/share/zoneinfo/Asia/Shanghai  /etc/localtime
# ENV NODE_HOME=$DIR/node-v10.17.0-linux-x64/bin
# ENV PATH=$NODE_HOME:$PATH
COPY ./ $DIR/
# RUN mkdir -p ~/logs
# RUN npm install -g node-gyp
# RUN node-gyp install
# RUN chown -R root:root ./*
# EXPOSE 80
# CMD ["node", "server.js"]
RUN rm -rf $DIR/node_module
RUN npm i --prod
EXPOSE 80
CMD ["node", "bin/www"]
