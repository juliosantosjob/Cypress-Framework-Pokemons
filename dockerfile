# Usa uma imagem oficial do Node como base
FROM cypress/included:12.7.0

# Define o diretório de trabalho no contêiner
WORKDIR /tests

# Copia os arquivos package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instala as dependências especificadas no package.json
RUN npm install

# Copia o código local para o contêiner
COPY . .

# Comando padrão para abrir o Cypress interativamente
ENTRYPOINT  ["npm", "run", "test"]