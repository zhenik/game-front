FROM node:13-alpine as ui-builder
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY package.json /usr/src/app/package.json
RUN yarn install
COPY . /usr/src/app
# APP
ENV VUE_APP_GAMEFICATION $VUE_APP_GAMEFICATION
ENV VUE_APP_API_URL $VUE_APP_API_URL
# FIREBASE
ENV VUE_APP_API_KEY $VUE_APP_API_KEY
ENV VUE_APP_AUTH_DOMAIN $VUE_APP_AUTH_DOMAIN
ENV VUE_APP_DATABASE_URL $VUE_APP_DATABASE_URL
ENV VUE_APP_PROJECT_ID $VUE_APP_PROJECT_ID
ENV VUE_APP_STORAGE_BUCKET $VUE_APP_STORAGE_BUCKET
ENV VUE_APP_MESSAGING_SENDER_ID $VUE_APP_MESSAGING_SENDER_ID
ENV VUE_APP_APP_ID $VUE_APP_APP_ID
ENV VUE_APP_MEASUREMENT_ID $VUE_APP_MEASUREMENT_ID


RUN yarn run build

# production stage
FROM nginx
COPY  --from=ui-builder /usr/src/app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
