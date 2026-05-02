# Build stage
FROM node:20-slim AS build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source
COPY . .

# Build the app
RUN npm run build

# Production stage
FROM node:20-slim

WORKDIR /app

# Copy package files and install production dependencies only
COPY package*.json ./
RUN npm install --production

# Copy the build output and server file
COPY --from=build /app/dist ./dist
COPY server.js ./

# Expose the port the app runs on
EXPOSE 3000

# Start the server
CMD ["node", "server.js"]
