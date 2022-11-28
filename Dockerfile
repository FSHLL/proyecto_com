FROM minizinc/minizinc

USER root

COPY package.json package.json
RUN apt update
RUN apt -y install curl
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
RUN ~/.bashrc
RUN nvm install --lts
RUN npm install
RUN npm run build

# Add your source files
COPY . .

CMD ["npm", "run","start"]  