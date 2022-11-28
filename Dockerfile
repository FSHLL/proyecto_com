FROM alpine:latest

COPY package.json package.json
RUN apk update && apk upgrade
RUN apk add minizinc
RUN npm install

# Add your source files
COPY . .

CMD ["npm","start"]