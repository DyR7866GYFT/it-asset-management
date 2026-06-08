# It-Support-Automation 💻

![React](https://img.shields.io/badge/react-%2320232a.svg?style=flat&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007acc.svg?style=flat&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=flat&logo=vite&logoColor=white)
![Environment](https://img.shields.io/badge/environment-web%20%2F%20SPA-blue.svg)

Una aplicación web SPA (Single Page Application) desarrollada en React y TypeScript, diseñada específicamente para optimizar el control, registro y seguimiento de la infraestructura tecnológica en entornos corporativos o de soporte técnico local.

El objetivo principal de este proyecto es resolver problemas reales de administración de hardware y software, demostrando un dominio sólido en la gestión de estados, componentes reutilizables y persistencia de datos del lado del cliente.

## 🚀 Características Clave

* **Registro Completo de Activos:** Formulario dinámico e intuitivo para añadir nuevos equipos recolectando datos críticos de soporte (Nombre del dispositivo, Tipo de activo, Dirección IP y Estado operativo).
* **Filtros Avanzados en Tiempo Real:** Búsqueda avanzada y segmentación instantánea de dispositivos según su estado actual (Activo, En Mantenimiento, De Baja) para agilizar la toma de decisiones del equipo de TI.
* **Persistencia de Datos Local:** Implementación de la API `LocalStorage` para simular una base de datos local, asegurando que la información de los activos se mantenga intacta incluso al recargar o cerrar la pestaña del navegador.
* **Arquitectura Limpia y Modular:** Estructura basada en componentes fuertemente tipados con TypeScript, facilitando la escalabilidad del sistema, el mantenimiento del código y la reutilización de elementos.

## 🛠️ Tecnologías y Herramientas

* **Frontend:** React.js (Hooks como `useState` y `useEffect`)
* **Tipado Seguro:** TypeScript (Interfaces estrictas para el modelado de activos)
* **Herramienta de Construcción:** Vite (Para un entorno de desarrollo ultrarrápido)
* **Estilos:** CSS Modules / CSS Estructurado
* **Almacenamiento:** Web Storage API (LocalStorage)

## 📦 Instalación y Uso Local

### Prerrequisitos
Asegúrate de tener instalado [Node.js](https://nodejs.org/) (versión 16 o superior) en tu sistema.

### Pasos para Ejecución

1. **Clonar este repositorio:**
```bash
git clone [https://github.com/DyR7666GYFT/gestión-de-activos-de-TI.git](https://github.com/DyR7666GYFT/gestión-de-activos-de-TI.git)
```

2. **Navegar a la carpeta del proyecto:**
```bash
cd gestión-de-activos-de-TI
```

3. **Instalar todas las dependencias requeridas:**
```bash
npm install
```

4. **Iniciar el servidor de desarrollo local:**
```bash
npm run dev
```

5. **Abrir la aplicación:**
Una vez levantado el servidor local por la terminal, abre tu navegador web e ingresa a la dirección de red provista por Vite (usualmente es `http://localhost:5173`).
