FROM node:19-alpine AS development_front

ENV NODE_ENV development

# Add a work directory
WORKDIR /front

# [eslint] EACCES: permission denied, mkdir '/front/node_modules/.cache'
RUN chown -R node:node /front

# Cache and Install dependencies
COPY --chown=node:node frontend/package.json frontend/package-lock.json /front/
RUN npm install

# Copy app files
COPY --chown=node:node . .

# Expose port
EXPOSE 3000

USER node

# Start the app
CMD [ "npm", "start" ]
