# 1. Base stage
FROM oven/bun:1-alpine AS base
RUN apk add --no-cache libc6-compat


# 2. Rebuild the source code
FROM base AS builder
WORKDIR /app
COPY package.json bun.lock ./
RUN --mount=type=cache,target=/root/.bun/install/cache \
    bun install --frozen-lockfile

COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
ENV NEXT_TELEMETRY_DISABLED 1

# Use cache mount for Next.js build cache to speed up subsequent builds
RUN --mount=type=cache,target=/app/.next/cache \
    bun run build


# 3. Production image, copy all the files and run next
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Use official uv binary instead of installing via curl
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /usr/local/bin/

# Combine system setup to reduce layers
RUN apk add --no-cache python3 && \
    addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs && \
    mkdir -p .next lib && \
    chown nextjs:nodejs .next lib

# Copy necessary files from builder
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/lib/channels.json ./lib/channels.json

# Pre-warm uvx cache as the nextjs user
USER nextjs
RUN --mount=type=cache,target=/home/nextjs/.cache/uv,uid=1001,gid=1001 \
    uvx --from youtube-transcript-api python3 -c "print('transcript-api ready')"

EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]

