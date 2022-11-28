FROM minizinc/minizinc

COPY package.json package.json
RUN apt update
RUN apt install nodejs
RUN apt -y install npm
RUN npm install
RUN npm run build

# Add your source files
COPY . .

CMD ["npm", "run","start"]  