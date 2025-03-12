# front-banckInc
```textplain
📦 Proyecto Angular
├── 📂 src
│   ├── 📂 app
│   │   ├── 📂 components                # Componentes reutilizables
│   │   │   ├── 📂 cancel-transaction
│   │   │   │   ├── cancel-transaction.component.css
│   │   │   │   ├── cancel-transaction.component.html
│   │   │   │   ├── cancel-transaction.component.spec.ts
│   │   │   │   ├── cancel-transaction.component.ts
│   │   │   │
│   │   │   ├── 📂 card-actions
│   │   │   │   ├── card-actions.component.css
│   │   │   │   ├── card-actions.component.html
│   │   │   │   ├── card-actions.component.spec.ts
│   │   │   │   ├── card-actions.component.ts
│   │   │   │
│   │   │   ├── 📂 recharger
│   │   │   │   ├── recharger.component.css
│   │   │   │   ├── recharger.component.html
│   │   │   │   ├── recharger.component.spec.ts
│   │   │   │   ├── recharger.component.ts
│   │   │   │
│   │   │   ├── 📂 transaction-list
│   │   │   │   ├── transaction-list.component.css
│   │   │   │   ├── transaction-list.component.html
│   │   │   │   ├── transaction-list.component.spec.ts
│   │   │   │   ├── transaction-list.component.ts
│   │   │   │
│   │   │   ├── 📂 virtual-card
│   │   │       ├── virtual-card.component.css
│   │   │       ├── virtual-card.component.html
│   │   │       ├── virtual-card.component.spec.ts
│   │   │       ├── virtual-card.component.ts
│   │   │
│   │   ├── 📂 pages                      # Páginas principales
│   │   │   ├── 📂 auth
│   │   │   │   ├── auth.component.css
│   │   │   │   ├── auth.component.html
│   │   │   │   ├── auth.component.spec.ts
│   │   │   │   ├── auth.component.ts
│   │   │   │
│   │   │   ├── 📂 card
│   │   │   │   ├── card.component.css
│   │   │   │   ├── card.component.html
│   │   │   │   ├── card.component.spec.ts
│   │   │   │   ├── card.component.ts
│   │   │   │
│   │   │   ├── 📂 profile
│   │   │       ├── profile.component.css
│   │   │       ├── profile.component.html
│   │   │       ├── profile.component.spec.ts
│   │   │       ├── profile.component.ts
│   │   │
│   │   ├── 📂 services                   # Servicios de lógica de negocio y API
│   │   │   ├── auth.service.ts
│   │   │   ├── card.service.ts
│   │   │   ├── transactions.service.ts
│   │   │
│   │   ├── app.component.css              # Estilos globales del componente raíz
│   │   ├── app.component.html             # Plantilla HTML del componente raíz
│   │   ├── app.component.spec.ts          # Pruebas unitarias del componente raíz
│   │   ├── app.component.ts               # Lógica del componente raíz
│   │   ├── app.config.ts                  # Configuración global de la aplicación
│   │   ├── app.routes.ts                  # Definición de rutas de la aplicación
│   │
│   ├── 📂 assets
│   │   ├── 📂 images                      # Carpeta para imágenes y recursos estáticos
│   │
│   ├── index.html                         # Archivo principal HTML de la aplicación
│   ├── main.ts                            # Punto de entrada de la aplicación Angular
│   ├── styles.css                         # Estilos globales de la aplicación
│
├── .editorconfig                          # Configuración de estilos de código
├── .gitignore                             # Archivos ignorados por Git
├── Dockerfile                             # Configuración para ejecutar en Docker
├── README.md                              # Documentación del proyecto

```

# Proyecto Angular: Plataforma de Administracion

Este proyecto es una aplicación frontend desarrollada en **Angular** que sigue una estructura **modular y escalable**, diseñada para facilitar el mantenimiento y la expansión del código.

## Endpoint del Frontend

La aplicación está desplegada en S3 + Amplify y puede ser accedida a través del siguiente enlace:

- **Plataforma de Administración de la Tarjeta:** [https://staging.d1pxievg15tb8f.amplifyapp.com/auth](https://staging.d1pxievg15tb8f.amplifyapp.com/auth)

## Despliegue Local con Docker

Para ejecutar el proyecto localmente, puedes utilizar Docker. A continuación, se detallan los pasos necesarios para desplegar la aplicación en tu entorno local.

### Requisitos Previos

- **Docker** instalado en tu máquina. Puedes descargarlo desde [aquí](https://www.docker.com/get-started).

### Pasos para Desplegar el Proyecto

1. **Clona el repositorio** en tu máquina local:

   ```bash
   git clone https://github.com/jadodev/front-banckInc.git
   ```

2.**Ingresa a la raíz del proyecto en tu terminal y ejecuta 

```bash
  docker build -t app-administracion .
```

3**Al terminar el proceso ejecuta el siguiente comando para iniciar la aplicacion:

```bash
  docker run -p 4300:80app-administracion
```

### Funcionalidad:

#### Esta app permite registrarse y adquirir una tarjeta debito o credito, agregarle saldo y cancelar alguna transaccion.
