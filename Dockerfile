FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 3000

ARG NEXT_PUBLIC_DB_URL
ARG NEXT_PUBLIC_HOST_URL

ARG NEXT_PUBLIC_apiKey
ARG NEXT_PUBLIC_authDomain
ARG NEXT_PUBLIC_projectId
ARG NEXT_PUBLIC_storageBucket
ARG NEXT_PUBLIC_messagingSenderId
ARG NEXT_PUBLIC_appId
ARG NEXT_PUBLIC_measurementId

ENV NEXT_PUBLIC_DB_URL=$NEXT_PUBLIC_DB_URL
ENV NEXT_PUBLIC_HOST_URL=$NEXT_PUBLIC_HOST_URL

ENV NEXT_PUBLIC_apiKey=$NEXT_PUBLIC_apiKey
ENV NEXT_PUBLIC_authDomain=$NEXT_PUBLIC_authDomain
ENV NEXT_PUBLIC_projectId=$NEXT_PUBLIC_projectId
ENV NEXT_PUBLIC_storageBucket=$NEXT_PUBLIC_storageBucket
ENV NEXT_PUBLIC_messagingSenderId=$NEXT_PUBLIC_messagingSenderId
ENV NEXT_PUBLIC_appId=$NEXT_PUBLIC_appId
ENV NEXT_PUBLIC_measurementId=$NEXT_PUBLIC_measurementId

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
