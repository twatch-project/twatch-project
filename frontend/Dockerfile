# Stage 0: build and compile the frontend
# Out dist should be at /app/dist
FROM node:latest as build-stage
WORKDIR /app

COPY . .

RUN npm install -g pnpm
RUN pnpm install
RUN pnpm build

# Step 1: copy built React app into base NGINX image
FROM nginx:latest

COPY --from=build-stage /app/dist /usr/share/nginx/html