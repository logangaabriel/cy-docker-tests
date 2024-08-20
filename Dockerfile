FROM cypress/factory

WORKDIR /app

COPY package.json package-lock.json /app/

RUN npm ci --silent

COPY . .

CMD ["npm", "run", "cy:run"]