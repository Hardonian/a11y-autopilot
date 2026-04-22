FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
RUN npm install -g puppeteer
CMD ["node", "dist/cli.js"]
