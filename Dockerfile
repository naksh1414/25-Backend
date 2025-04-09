# Use official Node.js LTS image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json tsconfig.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app source code
COPY ./src ./src

# Build the TypeScript project
RUN npm run build

# Expose the port your app runs on (update this if different)
EXPOSE 5000

# Start the app
CMD ["node", "dist/index.js"]
