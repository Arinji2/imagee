# Fetching the minified node image on Alpine Linux
FROM node:slim

# Setting up the work directory
WORKDIR /bot

# Copying all the files in our project
COPY . .


# Installing dependencies
RUN npm install
RUN npm run build

# Starting our application
CMD npm run start && tail -f /dev/null

# Exposing server port
EXPOSE 5002
