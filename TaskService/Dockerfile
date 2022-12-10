FROM node:18

RUN apt-get update && \
    apt-get upgrade -yq

ADD . /app
WORKDIR /app

RUN npm install

CMD ["npm", "start"]
