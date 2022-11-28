FROM minizinc/minizinc

COPY package.json package.json

# Add your source files
COPY . .