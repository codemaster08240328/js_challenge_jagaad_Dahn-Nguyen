FROM node:15.6.0

WORKDIR /usr/src/app

COPY . .

RUN npm install \
  && npm run build \
  && npm run generate

CMD ["npm", "start" ]
