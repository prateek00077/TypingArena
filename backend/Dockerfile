# Use official Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package files first (for better layer caching)
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy rest of the backend code
COPY . .

# Expose backend port
EXPOSE 3000

# Start the backend server
CMD ["npm", "start"]