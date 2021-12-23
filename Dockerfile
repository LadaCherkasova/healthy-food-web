#use official node image
FROM node:16.10.0

#create directory
RUN mkdir -p /app

#enter created directory
WORKDIR /app

#copy package.json
COPY package.json /app/

#install dependencies
RUN npm install

#copy all necessary code
COPY . /app/

#build and launch app
CMD node index.js --bind 0.0.0.0:$PORT
