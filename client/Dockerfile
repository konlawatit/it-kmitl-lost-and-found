FROM node:14-alpine

WORKDIR /usr/src/frontend
COPY package.json .
RUN npm install
COPY . .
CMD ["npm", "run", "serve", "--", "--port", "80"]