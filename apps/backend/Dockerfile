FROM node:20-alpine

# Install pnpm
RUN corepack enable && corepack prepare pnpm@10.0.0 --activate

WORKDIR /app

# Copy package files and prisma schema for postinstall
COPY package.json ./
COPY prisma ./prisma/

# Install dependencies
RUN pnpm install --ignore-scripts


# Copy source code
COPY . .

# Expose port
EXPOSE 4100

# Run in development mode with hot reload
CMD ["pnpm", "dev"]
