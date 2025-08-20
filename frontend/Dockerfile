FROM node:20-alpine

WORKDIR /app

# Install Python and build tools needed for some npm packages
RUN apk add --no-cache python3 make g++ 

# Set npm registry and timeout for better reliability
RUN npm config set registry https://registry.npmjs.org/ && \
    npm config set fetch-timeout 60000 && \
    npm config set fetch-retry-mintimeout 20000 && \
    npm config set fetch-retry-maxtimeout 120000

# Copy package files
COPY package.json package-lock.json* ./

# Clean install with platform-specific binaries
RUN npm ci --platform=linux --arch=x64 || npm install

# Force install the correct lightningcss binary for Alpine
RUN npm install lightningcss-linux-x64-musl

# Copy application code
COPY . .

EXPOSE 3000

# Start development server with proper binding
CMD ["npm", "run", "dev"]