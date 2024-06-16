FROM node:20-bullseye AS base

FROM base AS builder

RUN apt-get update

# Set working dir.
WORKDIR /app
RUN npm install -g turbo
# RUN pnpm global add turbo
COPY . .
RUN turbo prune @ouroboros/feeder --docker

# Add Lockfile and package.json of the issolated workspace.
FROM base AS installer
RUN apt-get update
RUN 
WORKDIR /app

# Install the depenendencies.
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-workspace.yaml
RUN pnpm install

# Build the project and its depenendencies.
COPY --from=builder /app/out/full .
COPY turbo.json turbo.json

RUN pnpm turbo build --filter=@ouroboros/feeder

FROM base as RUNNER
WORKDIR /app

RUN groupadd --system --gid 1001 feeder
# RUN groupadd --system --uid 1001 feeder
USER feeder
COPY --from=installer /app .

CMD node apps/feeder/out/index.js
