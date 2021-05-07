FROM node:14.16

# SET UP THE WORKING BACKEND
WORKDIR /usr/src/app

# COPY THE DEPENDENCIES
COPY package*.json ./

# INSTALL THEM
RUN npm install

# DIST (as the compiled backend)
RUN mkdir /usr/src/app/dist
COPY dist /usr/src/app/dist

CMD ["node", "dist/index.js"]