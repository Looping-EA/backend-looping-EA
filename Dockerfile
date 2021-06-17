FROM node:14.16

# SET UP THE WORKING BACKEND
WORKDIR /usr/src/app

# COPY ALL
COPY . /usr/src/app

# INSTALL DEPENDENCIES
RUN npm install

# SET ENVIRONMENT
ENV PROD_URL="mongodb://database:27017/looping"
ENV PORT="9090"

# BUILD
CMD ["npm", "run-script build"]

# EXECUTE THE SERVER
CMD ["node", "dist/index.js"]
