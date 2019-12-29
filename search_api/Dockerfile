FROM node:10.7

ENV APP_ROOT /src

RUN mkdir ${APP_ROOT}
WORKDIR ${APP_ROOT}
ADD . ${APP_ROOT}

RUN npm install
# RUN npm run build

RUN npm install pm2 -g
CMD [ "pm2-runtime", "npm", "--", "start" ]

ENV HOST 0.0.0.0