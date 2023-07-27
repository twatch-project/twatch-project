FROM node:latest

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install -g pnpm && \
    pnpm install

COPY . .

CMD [ "npm", "run dev" ]

EXPOSE 8000