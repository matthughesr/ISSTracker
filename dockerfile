# Use the official Nginx image as the base image
FROM nginx:alpine

# Copy all project files to the Nginx html directory
COPY . /usr/share/nginx/html/

# Expose port 80
EXPOSE 80

# Default command to start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]