# base image
FROM node:12.16.3

# set working directory
WORKDIR /data

# add 'data/node_modules/.bin:$PATH'
ENV PATH /data/node_modules/.bin:$PATH

#install and cache data dependencies
COPY package.json /data/package.json

RUN npm install

COPY . /data

CMD ng serve --host 0.0.0.0

#docker run -p 4200:4200 --rm app:dev