FROM node:20

WORKDIR /usr/app/frontend

COPY .yarn ./.yarn
COPY .yarnrc.yml package.json yarn.lock ./

COPY . .

RUN rm -rf node_modules

RUN yarn install

EXPOSE 5173

# CMD ["yarn", "dev", "--host"]
RUN yarn build
CMD ["echo", "'done'"]