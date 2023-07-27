FROM node:current-alpine

WORKDIR /home/app

COPY . .

RUN npm i -g pnpm
RUN pnpm i

CMD [ "npm", "run dev" ]

EXPOSE 8000