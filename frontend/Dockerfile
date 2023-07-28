FROM node:current-alpine

WORKDIR /home/app

COPY . .

RUN npm i -g pnpm
RUN pnpm i

EXPOSE 8000

CMD [ "npm", "run dev" ]