# Use an official Node.js runtime as a parent image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the application (for TypeScript or other build steps)
RUN npm run build

# Expose the port the app runs on
EXPOSE 4292

# Run the application
CMD ["npm", "start"]
