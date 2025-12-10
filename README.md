# Cveo - Generador de Currículums Profesional

**Cveo** es una aplicación web full-stack diseñada para simplificar la creación de currículums profesionales. Permite a los usuarios ingresar sus datos en un formulario reactivo, visualizar el resultado en tiempo real sobre plantillas de diseño y descargar el documento final en formato PDF de alta calidad.

![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## 🚀 Características Principales

- **Editor Interactivo:** Formulario inteligente (Angular Reactive Forms) con secciones dinámicas para experiencia y educación.
- **Previsualización en Vivo:** Observa cómo queda tu CV mientras escribes (Split Screen).
- **Generación de PDF:** Motor de renderizado en el backend utilizando **Puppeteer** para asegurar que el PDF descargado sea píxel-perfecto.
- **Gestión de Datos:** Guarda tus CVs en base de datos para editarlos más tarde.
- **Diseño Responsivo:** Interfaz moderna adaptada a móviles y escritorio gracias a Tailwind CSS.
- **Plantillas Profesionales:** Diseños limpios y modernos integrados.

## 🛠️ Tech Stack

### Frontend

- **Framework:** Angular 18+ (Standalone Components).
- **Estilos:** Tailwind CSS v3.
- **Arquitectura:** Servicios, Signals y Reactive Forms tipados estrictamente.

### Backend

- **Runtime:** Node.js.
- **Framework:** Express.js.
- **PDF Engine:** Puppeteer (Headless Chrome).
- **Base de Datos:** MySQL 8.0.
- **ORM/Driver:** mysql2 (con promesas).

---

## 📦 Instalación y Configuración

Sigue estos pasos para levantar el proyecto en tu entorno local.

### 1. Prerrequisitos

- Node.js (v18 o superior).
- MySQL Server instalado y corriendo.
- Git.

### 2. Clonar el repositorio

```bash
git clone https://github.com/Juanpedrogomezespinosa/cveo.git
cd cveo
```

### 3. Configuración del Backend

cd backend
npm install

### Crea un archivo .env en la carpeta backend con tus credenciales de base de datos:

PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASS=tu_password
DB_NAME=cveo_db

### Ejecuta el servidor:

npm run dev

# O si no tienes scripts configurados aún:

# node index.js

### 4. Configuración del Frontend

En una nueva terminal:

cd frontend
npm install
npm start

### 🗄️ Base de Datos

El proyecto requiere una estructura de base de datos específica.

Abre tu gestor (MySQL Workbench).

Crea una base de datos llamada cveo_db (o el nombre que hayas puesto en el .env).

Ejecuta el script SQL generado para crear las tablas users, resumes, experience, education y templates.

### 🤝 Contribución

Haz un Fork del proyecto.

Crea una rama para tu feature (git checkout -b feature/AmazingFeature).

Haz commit de tus cambios (git commit -m 'Add some AmazingFeature').

Haz Push a la rama (git push origin feature/AmazingFeature).

Abre un Pull Request.

### 📄 Licencia

Distribuido bajo la licencia MIT.

Desarrollado con ❤️ por Juan Pedro Gómez
