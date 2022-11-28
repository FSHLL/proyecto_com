FROM minizinc/minizinc

COPY package.json package.json
RUN apt update
RUN apt --yes install nodejs

# Add your source files
COPY . .

CMD ["npm", "run", "start"]  