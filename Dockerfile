FROM node:8

RUN apt-get update \
  && apt-get install -y libelf1 apt-transport-https \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json /app/
RUN npm install --silent

COPY . /app
RUN npm run validate

CMD npm start

EXPOSE 3000
