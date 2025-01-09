# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Rebuild bcrypt module from source
RUN npm rebuild bcrypt --build-from-source

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Compile TypeScript to JavaScript
RUN npx tsc

# Expose the port the app runs on
EXPOSE 5000

# Run the app from the dist directory
CMD ["node", "dist/bin/www.js"]
