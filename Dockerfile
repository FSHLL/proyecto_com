FROM alpine:latest

COPY package.json package.json
RUN apk update && apk upgrade
RUN apk add minizinc

# Add your source files
COPY . .

CMD ["npm","start"]