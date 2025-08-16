FROM node:20-alpine

WORKDIR /app

# Install dependencies first (better caching)
COPY package.json package-lock.json* ./
RUN npm ci || npm install

# Copy application code
COPY . .

# Ensure node_modules is properly set up
RUN npm install

EXPOSE 3000

# Use shell form to handle environment properly
CMD ["sh", "-c", "npm run dev"]