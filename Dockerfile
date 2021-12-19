FROM node:16.10.0
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app/
RUN npm install
COPY . /app/
CMD node index.js --bind 0.0.0.0:$PORT
