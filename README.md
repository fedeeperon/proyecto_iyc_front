
# Proyecto: Calculadora IMC 

Este proyecto consiste en una aplicación web para calcular el índice de Masa Corporal (IMC) a partir de los datos de peso y altura ingresados por el usuario.
El sistema determina la categoría correspondiente (bajo peso, normal, sobrepeso, obesidad, etc.) y está dividido en frontend y backend, desplegados en la web para acceso público.


# Objetivos del Proyecto

* Desplegar la aplicación en un hosting público  
* Validar la comunicación entre frontend y backend  
* Documentar el proceso de despliegue y problemas encontrados  
* Aplicar prácticas ágiles (Scrum + Kanban)  

# Requisitos 

* Node.js v18 o superior

* GitHub para repositorios

* Postman para pruebas de API

* Hosting: Render (backend) y Vercel (frontend)

## Instalación

Backend (NestJS)

1. Clonar el repositorio
```bash
  git clone https://github.com/fedeeperon/proyecto_iyc_back
  cd proyecto_iyc_back
```
2. Instalar dependencias
```bash
  npm install
```
3. Ejecutar en desarrollo
```bash
  npm run start:dev
```
4. Compilar y ejecutar en producción
```bash
  npm run build
  npm run start
```

Frontend (React + Vite)

1. Clonar repositorio
```bash
  git clone https://github.com/fedeeperon/proyecto_iyc_front
  cd proyecto_iyc_front
```

2. Instalar dependencias
```bash
  npm install
```
3. Archivo .env
```bash
    VITE_API_URL=https://proyecto-iyc-back.onrender.com
```
4. Ejecutar en desarrollo
```bash
  npm run dev
```
## Despliegue del Proyecto

El proyecto se despliega con:

### Backend en Render
1. Iniciar sesión en Render con GitHub.
2. Crear un nuevo servicio: New → Web Service.
3. Seleccionar el repositorio del backend.
4. Configurar los comandos:
Build command
```bash
  npm install && npm run build
```
Start command
```bash
  npm run start
```
5. Deployar y obtener la URL pública del backend:

https://proyecto-iyc-back.onrender.com/

### Frontend en Vercel
1. Ingresar a Vercel y conectar el repositorio del Frontend.
2. Configurar la variable de entorno:
```bash
    VITE_API_URL=https://proyecto-iyc-back.onrender.com
```
3. Realizar Deploy y obtener el dominio público para acceder a la app. 

https://proyecto-iyc-front.vercel.app/
## Equipo de Desarrollo 

* Gomez Redondo, Laureano

* Lynch, Ramiro

* Mercado Galfré, Llanco

* Milanesio, Hebe del Lourdes

* Perón, Federico

* Romero, Jimena Soledad

* Toranzo, Juan Cruz
