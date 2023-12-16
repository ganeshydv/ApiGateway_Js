FROM node:18
WORKDIR /app
COPY package.json .
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "dev" ]; \
        then npm i; \
        else npm i --only=prod; \
        fi
COPY . ./
# ENV PORT 3000
# EXPOSE $PORT
CMD ["node","server.js"]