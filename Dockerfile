FROM minizinc/minizinc

COPY package.json package.json
RUN apk add --update nodejs npm

# Add your source files
COPY . .

CMD ["npm","start"]