FROM node:20-alpine AS builder
RUN apk add --no-cache curl
RUN curl -fsSL https://get.pnpm.io/install.sh | SHELL=$(which sh) sh -
ENV PATH="/root/.local/share/pnpm:$PATH"
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm run build

FROM node:20-alpine
RUN npm install -g serve
COPY --from=builder /app/build /app/build
EXPOSE 3001
CMD ["serve", "-s", "/app/build", "-l", "3001"]