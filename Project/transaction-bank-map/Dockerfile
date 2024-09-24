# Use the official Node.js image as the base image
FROM node:v20.14.0 AS build

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Angular application
RUN npm run build --prod

# Stage 2: Serve the application using a lightweight server
FROM nginx:alpine

# Copy the built application from the previous stage
COPY --from=build /usr/src/app/dist/my-angular-app /usr/share/nginx/html

# Expose the default port
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
