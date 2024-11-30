FROM node:20 AS base

FROM base AS builder
WORKDIR /app

COPY . ./

# Define build argument
ARG MAXMIND_LICENSE_KEY
# Make it available as env var during build
ENV MAXMIND_LICENSE_KEY=$MAXMIND_LICENSE_KEY
# Enable corepack for pnpm
RUN corepack enable
# Install dependencies
RUN pnpm install
# Generate Prisma client
RUN pnpm geoip-setup
# Build the application
RUN pnpm build

FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 geoip

# Copy only necessary files from builder
COPY --from=builder --chown=geoip:nodejs /app/dist ./dist
COPY --from=builder --chown=geoip:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=geoip:nodejs /app/package.json ./package.json

USER geoip
EXPOSE 3001

ENV NODE_ENV=production

CMD ["node", "dist/index.cjs"]