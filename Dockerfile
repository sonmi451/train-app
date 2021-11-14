# Base image
FROM node:16

# Upgrade npm
RUN  npm i -g npm@latest

# Install packages ensuring compatibility
COPY package.json /trains/
WORKDIR /trains/
RUN npm install

# Add installed modules to path
ENV PATH /trains/node_modules/.bin:$PATH

# Add files needed for app
COPY ./app.json /trains/app.json
COPY ./App.js /trains/App.js

# Set working directory
WORKDIR /trains/

ENTRYPOINT bash
