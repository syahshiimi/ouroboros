FROM node:20-alpine AS base

# Setup the alpine image.
RUN apk add --no-cache libc6-compat

# Setup corepack pnpm and turbo.
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable
RUN pnpm install turbo --global && pnpm config set store-dir ~/.pnpm-store

# Prune projects.
FROM base AS builder
RUN apk update
WORKDIR /app
COPY . .
RUN turbo prune @ouroboros/feeder --docker

# Prepare the build step.
FROM base AS installer
RUN apk update
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
FROM gcr.io/distroless/nodejs20-debian11
WORKDIR /app

ENV NODE_ENV=production

COPY --from=installer --chown=hono:nodejs /app/apps/feeder/out/index.cjs .

ENV PORT 4000
EXPOSE $PORT

CMD ["./index.cjs"]
