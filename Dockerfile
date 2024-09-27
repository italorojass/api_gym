# Usa la imagen base de Node.js
FROM node:18

# Instala las dependencias del sistema para ODBC y otras herramientas de compilación
RUN apt-get update && apt-get install -y \
    build-essential \
    unixodbc-dev \
    libssl-dev \
    python3 \
    g++ \
    make

# Establece el directorio de trabajo
WORKDIR /api-gym

# Copia los archivos package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias de Node.js
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Exponer el puerto (ajusta si tu API usa otro puerto)
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]
