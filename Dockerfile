FROM node:14

WORKDIR /client

COPY package*.json /client/

RUN npm install @vue/cli -g
RUN npm install

COPY . /client/

EXPOSE 8080

CMD ["npm", "run", "serve"]