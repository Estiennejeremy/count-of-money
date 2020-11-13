FROM node:9.11.2-alpine

WORKDIR /src
COPY ./ /src
RUN npm install
RUN npm run build
CMD [ "npm", "run", "serve" ]