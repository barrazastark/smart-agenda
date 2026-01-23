FROM node:20-alpine

# Install pnpm
RUN corepack enable && corepack prepare pnpm@9.0.0 --activate

WORKDIR /app

# Copy package files
COPY package.json ./

# Install dependencies
RUN pnpm install

# Copy source code
COPY . .

# Expose port
EXPOSE 3100

# Set environment variable
ENV NEXT_TELEMETRY_DISABLED=1

# Run in development mode
CMD ["pnpm", "dev"]
