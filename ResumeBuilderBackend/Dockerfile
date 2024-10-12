# Use official Node.js as base image
FROM node:16

# Set working directory
WORKDIR /app

# Install dependencies
COPY ./package.json /app/
RUN npm install

# Copy the frontend files
COPY ./ /app/

# Expose frontend port
EXPOSE 4200

# Command to run Angular development server
CMD ["npm", "start"]
