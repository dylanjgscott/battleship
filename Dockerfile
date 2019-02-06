FROM node:10.15.0
COPY . /opt/battleship
WORKDIR /opt/battleship
RUN npm install
CMD node server.js
EXPOSE 8000
