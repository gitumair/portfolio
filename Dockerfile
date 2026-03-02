# Use official nginx image
FROM nginx:alpine

# Copy website files to nginx serving directory
COPY . /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]