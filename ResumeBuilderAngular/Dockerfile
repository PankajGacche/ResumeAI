# Use official Node.js as base image
FROM node:16

# Set working directory
WORKDIR /app

# Install dependencies with force flag to ignore peer dependency issues
COPY ./package.json /app/
RUN npm install --force

# Copy the frontend files
COPY ./ /app/

# Expose frontend port
EXPOSE 4200

# Command to run Angular development server
CMD ["npm", "start"]
