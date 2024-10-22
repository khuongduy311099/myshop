# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:1 AS base
WORKDIR /usr/src/app

COPY package.json .
COPY bun.lockb .
RUN bun install
COPY . .
ENV SERVER_PORT 3001
EXPOSE $SERVER_PORT
ENTRYPOINT ["bun", "start"]