FROM node:20-bullseye-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
# Setup debian-slim image.
RUN apt-get update \
  && apt-get install -y ca-certificates \
  && rm -rf /var/lib/apt/lists/*

# Setup corepack pnpm and turbo.
RUN corepack enable
RUN pnpm install turbo --global
RUN pnpm config set store-dir ~/.pnpm-store

# Prune projects.
FROM base AS builder
RUN apt-get update
WORKDIR /app
COPY . .
RUN turbo prune @ouroboros/feeder-worker --docker

# Build the project
FROM base AS installer
RUN apt-get update
WORKDIR /app

# Add lockfile and package.json.
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml

# Install the depenendencies first.
RUN --mount=type=cache,id=pnpm,target=~/.pnpm-store pnpm install --frozen-lockfile

# Copy source code fro misoalted sub-workspace.
COPY --from=builder /app/out/full .

# Build the project
COPY turbo.json turbo.json
RUN turbo build --filter=@ouroboros/feeder-worker
RUN --mount=type=cache,id=pnpm,target=~/.pnpm-store pnpm prune --prod --no-optional
RUN rm -rf ./**/*/src

# Final Image
FROM base as RUNNER
WORKDIR /app

RUN groupadd --system --gid 1001 feeder-worker
RUN adduser --system --uid 1001 worker
USER worker

ENV NODE_ENV=production

# Working, dont delete.
# COPY --from=installer --chown=worker:feeder-worker /app .

COPY --from=installer --chown=worker:feeder-worker /app/apps/feeder-worker/out ./apps/feeder-worker/out
COPY --from=installer --chown=worker:feeder-worker /app/apps/feeder-worker/node_modules ./apps/feeder-worker/node_modules
COPY --from=installer --chown=worker:feeder-worker /app/apps/feeder-worker/package.json ./apps/feeder-worker/package.json

COPY --from=installer --chown=worker:feeder-worker /app/node_modules node_modules
COPY --from=installer --chown=worker:feeder-worker /app/packages packages

CMD du -sh *

# working, don't delete.
ENTRYPOINT ["node", "apps/feeder-worker/out/worker.js"]
