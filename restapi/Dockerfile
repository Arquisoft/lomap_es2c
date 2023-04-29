FROM node:18.13.0
LABEL org.opencontainers.image.source https://github.com/Arquisoft/lomap_es2c
COPY . /app
WORKDIR /app
#Install the dependencies
RUN npm install

ARG DATABASE_URL="DATABASE_URL"
ENV DATABASE_URL=$DATABASE_URL

CMD [ "npm", "start" ]
