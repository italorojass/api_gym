# Usa la versión de Node.js 18 como base (puedes cambiar la versión según sea necesario)
FROM node:18

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /api-gym

# Copiar los archivos de package.json y package-lock.json (si existe)
COPY package*.json ./

# Instalar las dependencias del proyecto
RUN npm install --production

# Copiar el resto del código de la aplicación al contenedor
COPY . .

# Establecer la variable de entorno para el entorno de producción (opcional, si tu aplicación lo necesita)
ENV NODE_ENV=production

# Exponer el puerto que usa tu API (por ejemplo, 3000, ajusta esto si tu API usa otro puerto)
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]
