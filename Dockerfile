FROM minizinc/minizinc

COPY package.json package.json
RUN apt install nodejs

# Add your source files
COPY . .