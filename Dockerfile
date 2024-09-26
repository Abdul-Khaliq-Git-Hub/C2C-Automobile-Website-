FROM node:latest

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm build --no-lint

RUN pnpm build

CMD ["pnpm", "start"]
