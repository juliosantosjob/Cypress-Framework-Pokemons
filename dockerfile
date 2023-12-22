FROM cypress/included

WORKDIR /user/app

COPY package*.json ./

RUN npm install

COPY . .

# CMD ["npm", "run", "open"]

# RUN npm run open



# docker rmi -f cypress-test
# docker build -t cypress-test .
# docker run cypress-test