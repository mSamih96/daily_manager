FROM node:18

RUN apt-get update && \
	apt-get upgrade -yq && \
	npm -g update && \
	npm -g upgrade && \
	npm -g install npm

COPY . /app
WORKDIR /app

RUN npm install

CMD ["npm", "start"]
