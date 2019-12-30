FROM node:latest

WORKDIR /usr/src/whizzball
COPY . .
RUN npm run build
RUN rm -rf src/
RUN rm -rf api/

CMD npm start