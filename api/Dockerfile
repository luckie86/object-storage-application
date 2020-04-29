# base image
FROM node:12.16.3

# set working directory
WORKDIR /data

# add 'data/node_modules/.bin:$PATH'
ENV PATH /data/node_modules/.bin:$PATH

#install and cache data dependencies
COPY package.json /data/package.json

RUN npm install

RUN npm install -g nodemon
# copy everything
COPY . /data
# start the app
CMD npm start

#docker run -v "${PWD}"/DB.json:/data/DB.json -v "${PWD}"/uploads:/data/uploads -p 3000:3000 --rm api:dev