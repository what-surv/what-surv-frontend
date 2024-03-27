FROM node:20

WORKDIR /usr/src/app

COPY .yarn ./.yarn
COPY .yarnrc.yml package.json yarn.lock ./

COPY . .

RUN yarn install

EXPOSE 5173

CMD ["yarn", "dev", "--host"]