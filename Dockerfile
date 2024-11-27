FROM node:alpine

WORKDIR /app

COPY . .

EXPOSE 3000

RUN apk update && \
    apk add --no-cache bash openssl curl && \
    apk upgrade --no-cache

CMD ["node", "index.js"]