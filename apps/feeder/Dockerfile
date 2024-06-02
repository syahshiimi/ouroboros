FROM node:20-bullseye

# For better cache utilization, copy package.json and lock file first and install the dependencies before copying the
# rest of the application and building.
COPY . /app
WORKDIR /app

# Alternatively, run npm ci, which installs only dependencies specified in the lock file and is generally faster.
RUN npm install --only=production \
  && npm run build

CMD ["npm", "start"]
