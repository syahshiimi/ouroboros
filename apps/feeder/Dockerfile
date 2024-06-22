FROM node:20-bullseye-slim AS base

# Setup pnpm.
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN apt-get update \
  && apt-get install -y ca-certificates \
  && rm -rf /var/lib/apt/lists/*
RUN corepack enable
RUN pnpm install turbo --global

FROM base AS builder
# Set working dir.
RUN apt-get update
# RUN apt-get -y install libc6-compat
WORKDIR /app
COPY . .
RUN turbo prune @ouroboros/feeder --docker

# Add Lockfile and package.json of the issolated workspace.
FROM base AS installer
RUN apt-get update
WORKDIR /app

# Install the depenendencies.
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml
RUN pnpm install

# Build the project and its depenendencies.
COPY --from=builder /app/out/full .
COPY turbo.json turbo.json
RUN turbo build --filter=@ouroboros/feeder

FROM base as RUNNER
WORKDIR /app

RUN groupadd --system --gid 1001 feeder
# RUN groupadd --system --uid 1001 feeder
USER feeder
COPY --from=installer /app .

CMD node app/api/dist/index.js

