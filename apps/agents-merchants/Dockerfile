ARG NODE_VERSION=20
FROM node:${NODE_VERSION}-bullseye-slim AS base

# Install bun.
ARG BUN_VERSION=1.1.16
ENV PATH="${PATH}:/root/.bun/bin"
RUN apt-get update && apt-get install -y bash curl unzip  && \
  curl https://bun.sh/install | bash -s -- bun-v${BUN_VERSION}

# Install pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable
RUN pnpm install turbo --global
RUN pnpm config set store-dir ~/.pnpm-store

# Prune projects.
FROM base AS builder
RUN apt-get update
WORKDIR /app
COPY . .
RUN turbo prune @ouroboros/agents-merchants --docker

# Prepare the build step.
FROM base AS installer
RUN apt-get update
WORKDIR /app

# Add lockfile and package.json
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml

# Install the dependencies.
RUN --mount=type=cache,id=pnpm,target=~/.pnpm-store pnpm install --no-frozen-lockfile

# Copy source code fro misoalted sub-workspace.
COPY --from=builder /app/out/full .

ENV NODE_ENV=production

# Build the project
COPY turbo.json turbo.json
RUN turbo build --filter=@ouroboros/agents-merchants
RUN --mount=type=cache,id=pnpm,target=~/.pnpm-store pnpm prune --prod --no-optional

# Final iamge.
FROM oven/bun:slim AS runner
WORKDIR /app
ARG MARKET_PARTICIPANT

# Copy relevant build artifacts only.
COPY --from=installer --chown=bun:bun /app/apps/agents-merchants/out/${MARKET_PARTICIPANT}.js .
COPY --from=installer --chown=bun:bun /app/apps/agents-merchants/package.json package.json

ENV NODE_ENV=production
ENV MARKET_PARTICIPANT=MARKET_PARTICIPANT

CMD [ "sh", "-c", "bun run ./${MARKET_PARTICIPANT}.js" ]