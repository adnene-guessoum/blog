FROM node:19-alpine AS development_front

ENV NODE_ENV development

# Add a work directory
WORKDIR /front

# Cache and Install dependencies
COPY package.json package-lock.json /front/

RUN npm install

# Copy app files
COPY . ./

# Expose port
EXPOSE 3000

# Start the app
CMD [ "npm","run", "build" ]
