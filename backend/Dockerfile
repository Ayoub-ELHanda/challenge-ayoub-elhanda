# Use Node.js with Alpine for smaller size
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy the package.json and lock file first for dependency caching
COPY package*.json ./

# Install both production and dev dependencies
RUN npm install

# Copy the entire source code into the container
COPY . .

# Compile TypeScript files for production build
RUN npx tsc

# Expose the port used by the backend
EXPOSE 5000

# Run the dev server with nodemon for hot reloading
CMD ["npm", "run", "dev"]
