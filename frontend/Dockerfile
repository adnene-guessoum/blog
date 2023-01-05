FROM node:19-alpine AS development_front

ENV NODE_ENV development

# Add a work directory
WORKDIR /usr/src/frontend

# Cache and Install dependencies
COPY package.json package-lock.json .

RUN npm install

# Copy app files
COPY . ./

RUN npm run build

CMD ["npm", "run", "start"]
