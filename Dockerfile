FROM minizinc/minizinc

COPY package.json package.json
RUN apt -y install curl
RUN (curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash)
RUN \. $HOME/.nvm/nvm.sh && \. "$HOME/.nvm/bash_completion" && export NVM_DIR="$HOME/.nvm"
RUN nvm install --lts
RUN npm install
RUN npm run build

# Add your source files
COPY . .

CMD ["npm", "run","start"]  