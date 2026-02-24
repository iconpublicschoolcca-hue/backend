# Use Node LTS
FROM node:18-alpine

# Create app directory
WORKDIR /app

# Install dependencies first (better caching)
COPY package*.json ./
RUN npm install

# Copy rest of the backend
COPY . .

# Expose backend port
EXPOSE 5000

# Start server
CMD ["npm", "run", "dev"]
