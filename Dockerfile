# spider-mzitu
# VERSION               1.0.0

FROM daocloud.io/node:7
LABEL maintainer owen-carter

ENV HTTP_PORT 8000

VOLUME ["~"]
COPY ./
WORKDIR ./

RUN npm --registry=https://registry.npm.taobao.org --disturl=https://npm.taobao.org/dist install
RUN npm install
EXPOSE 8000

ENTRYPOINT ["./entrypoint.sh"]
CMD ["npm", "start"]
