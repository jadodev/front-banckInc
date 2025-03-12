# Etapa 1: Construcción de Angular
FROM node:18 AS builder

WORKDIR /app

# Copia el código fuente y archivos de configuración
COPY package.json package-lock.json ./
RUN npm install

COPY . .

# Construye la aplicación para producción
RUN npm run build -- --configuration=production

# Etapa 2: Servir la aplicación con Nginx
FROM nginx:alpine

# Copia los archivos construidos desde la etapa anterior
COPY --from=builder /app/dist/front-bank/browser /usr/share/nginx/html

# Copia una configuración personalizada de Nginx (opcional)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expone el puerto en el que Nginx servirá la aplicación
EXPOSE 80

# Inicia el servidor Nginx
CMD ["nginx", "-g", "daemon off;"]
