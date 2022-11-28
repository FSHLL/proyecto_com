FROM minizinc/minizinc

COPY package.json package.json
RUN apt update
RUN apt --yes install nodejs
RUN apt --yes install npm

# Add your source files
COPY . .

CMD ["npm", "run","start"]  