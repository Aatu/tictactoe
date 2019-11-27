FROM node:13 as build

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn
COPY . .
RUN yarn build

FROM node:13

WORKDIR /app
COPY --from=build /app/build .
RUN yarn global add serve
EXPOSE 5000
CMD serve -s .