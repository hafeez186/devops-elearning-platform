# Backend Dockerfile
FROM node:18-alpine AS build

WORKDIR /app

# Copy package files and TypeScript config
COPY package*.json ./
COPY tsconfig.json ./

# Install all dependencies (needed for build)
RUN npm ci

# Copy Prisma schema and source code BEFORE building
COPY prisma ./prisma
COPY src ./src

# Generate Prisma client and build TypeScript
RUN npx prisma generate
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Copy Prisma schema for runtime
COPY prisma ./prisma

# Install only production dependencies
RUN npm ci --only=production

# Generate Prisma client for production
RUN npx prisma generate

# Copy built application from build stage
COPY --from=build /app/dist ./dist

# Copy the generated Prisma client from build stage
COPY --from=build /app/node_modules/.prisma ./node_modules/.prisma

# Expose port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node healthcheck.js

# Start the application
CMD ["npm", "start"]
