FROM node:12
RUN npm install -g @angular/cli
RUN npm install
USER node
WORKDIR /app
EXPOSE 4200 49153
CMD npm start