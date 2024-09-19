# Build stage
FROM node:20 AS builder
RUN curl -fsSL https://get.pnpm.io/install.sh | SHELL=$(which bash) bash -
ENV PATH="/root/.local/share/pnpm:$PATH"
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm run build

# Production stage
FROM node:20-slim
RUN npm install -g serve
COPY --from=builder /app/build /app
WORKDIR /app
EXPOSE 3001
CMD ["serve", "-s", ".", "-l", "3001"]