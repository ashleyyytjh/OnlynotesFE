# syntax=docker/dockerfile:1

ARG NODE_VERSION=lts

################################################################################
# Base image
FROM node:${NODE_VERSION}-alpine AS base

# Set working directory for all build stages.
WORKDIR /usr/src/app

################################################################################
# Production stage
FROM base AS build

COPY ./package.json .
COPY ./package-lock.json .
RUN npm ci

COPY . .
RUN npm run build

################################################################################
# Nginx stage for production
FROM nginx:alpine AS production

# Copy the built application from the build stage
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Copy Nginx configuration file
COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

################################################################################
# Development stage
FROM base AS development

COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm ci

COPY . .

# Use development node environment by default.
ENV NODE_ENV=development

# Expose port for development server
EXPOSE 5173

# Run the application in development mode
CMD ["npm", "run", "dev"]
