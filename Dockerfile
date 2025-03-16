FROM oven/bun:latest

ENV BASE_DIR=/app
COPY ./ ${BASE_DIR}
WORKDIR ${BASE_DIR}

RUN bun install

CMD ["sh", "-c", "bun run start"]