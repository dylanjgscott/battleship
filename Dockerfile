FROM node:10.15.0
COPY . /opt/battleship
WORKDIR /opt/battleship
ENV NODE_ENV production
RUN npm ci
CMD node server.js
EXPOSE 8000
