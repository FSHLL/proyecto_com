FROM minizinc/minizinc

COPY package.json package.json
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash
RUN nvm install --lts
RUN npm install
RUN npm run build

# Add your source files
COPY . .

CMD ["npm", "run","start"]  