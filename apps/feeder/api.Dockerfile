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
RUN turbo prune @ouroboros/feeder --docker

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
RUN turbo build --filter=@ouroboros/feeder
RUN --mount=type=cache,id=pnpm,target=~/.pnpm-store pnpm prune --prod --no-optional
RUN rm -rf ./**/*/src

# Final Image
FROM base as RUNNER
WORKDIR /app

RUN groupadd --system --gid 1001 feeder/rest
RUN adduser --system --uid 1001 rest
USER feeder

ENV NODE_ENV=production

COPY --from=installer --chown=feeder:feeder /app .

ENV PORT 4000
EXPOSE $PORT

CMD ["node", "apps/feeder/out/src/index.js"]
