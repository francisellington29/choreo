FROM node:alpine

WORKDIR /app

COPY . .

EXPOSE 3000

RUN apk update && \
    apk add --no-cache bash openssl curl && \
    apk upgrade --no-cache && \
    chmod 777 start.sh

CMD ["node", "index.js"]

USER 10014
