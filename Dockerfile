
# STEP 1: Build
FROM node:8-alpine as builder

ARG APP_NAME

LABEL authors="mingxu <wangmingxu@bytedance.com>"

# RUN npm i -g http-server

COPY package.json package-lock.json ./

RUN npm set progress=false && npm config set depth 0 && npm cache clean --force
# 这样可以利用缓存 如果先COPY . . 再RUN npm install 则code变化就会触发重新npm install
RUN npm i && mkdir /${APP_NAME} && cp -R ./node_modules ./${APP_NAME}

WORKDIR /${APP_NAME}

COPY . .

RUN npm run build

# CMD http-server -p 80 ./dist

# RUN npm run build:ssr

# CMD npx pm2 start ./dist/server/server.js -i max --no-daemon

# STEP 2: Setup
FROM nginx:alpine

ARG APP_NAME

COPY --from=builder /${APP_NAME}/_nginx/default.conf /etc/nginx/conf.d/default.conf
# COPY --from=builder /${APP_NAME}/_nginx/ssl/* /etc/nginx/ssl/

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /${APP_NAME}/dist /usr/share/nginx/html

CMD [ "nginx", "-g", "daemon off;"]


