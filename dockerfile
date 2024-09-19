FROM node:20 AS build
RUN curl -fsSL https://get.pnpm.io/install.sh | SHELL="$(which bash)" bash -
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install
COPY . .
RUN pnpm run build

# Final stage
FROM node:20
WORKDIR /app
COPY --from=build /app/build /app/build
RUN npm install -g serve
EXPOSE 3001
CMD ["serve", "-s", "build", "-l", "3001"]
