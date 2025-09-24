<h1 align= "center"> Mi Tienda </h1>
<h2 align= "center"> Evaluación Final Módulo 6 </h2>

Éste repositorio contiene una aplicación de e-commerce desarrollada en Vue.js como proyecto de evaluación final del módulo 6 de Vue. Permite la visualización de productos, búsqueda, autenticación de usuarios y gestión de carrito de compras.

## 🚀 Características Principales

- **🏠 Home** con lista de productos
- **🔍 Búsqueda** de productos por nombre
- **🛒 Carrito de compras** con gestión completa
- **🔐 Sistema de autenticación** (Login/Logout)
- **📱 Diseño responsive** con componentes modulares
- **⚡ Simulación de API** con servicios JavaScript

## 🛠️ Tecnologías Utilizadas

- **Frontend:** HTML5, CSS, JavaScript (ES Modules)
- **Vue 3** - Framework principal
- **Vue Router** - Navegación entre vistas
- **Pinia** - Gestión de estado 
- **Framework CSS: Tailwindcss** - Estilos y diseño responsive
- **LocalStorage** - Persistencia de datos
- **Control de Versiones:** Git & GitHub
- Font Awesome - Iconografía

## 📌 Estructura del Proyecto
````
src/
├── components/
│ ├── Footer.vue        
│ ├── Hero.vue     
│ ├── Navbar.vue        # Barra de navegación
│ └── ProductCard.vue   
├── views/
│ ├── Carrito.vue       # Carrito de compras
│ ├── Home.vue          # Vista principal
│ ├── Login.vue         # Formulario de login
│ └── Productos.vue     # Sección de productos
├── stores/
│ ├── api.js            # Simulación API productos
│ └── auth.js           # Simulación API autenticación
├── router/index.js     # Configuración de rutas
└── App.vue             # Componente principal
````

## 🎯 Funcionalidades Implementadas

### ✅ Requisitos Cumplidos

#### **Gestión de Productos**
- [x] Lista de productos en Home
- [x] Búsqueda de productos por nombre
- [x] Filtrado en tiempo real
- [x] Control de stock disponible
- [x] Popup de detalle de producto

#### **Carrito de Compras**
- [x] Añadir productos con cantidad
- [x] Ver carrito de compras
- [x] Eliminar productos del carrito
- [x] Botón para vaciar carrito completo
- [x] Cálculo de totales

#### **Autenticación de Usuarios**
- [x] Formulario de login funcional
- [x] Validación de credenciales
- [x] Mensajes de error para credenciales incorrectas
- [x] Redirección a /home tras login exitoso
- [x] Control de sesión con LocalStorage
- [x] Navbar dinámico (Login/Logout)

#### **Servicios API Simulados**
- [x] `API.js` - `Products.all()` retorna promesa con array de productos
- [x] `Auth.js` - `Auth.login(creds)` retorna promesa con objeto User o error
- [x] Credenciales válidas: `usuario1@mitienda.com` / `password`

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js (versión 14 o superior)
- npm o yarn

### Pasos de Instalación

1. Clonar repositorio
   
```
git clone https://github.com/CaroHernz/
cd 
```

2. Instalar dependencias

```
npm install
```

3. Ejecutar en modo desarrollo

```
npm run dev
```

### 📄 Licencia
Este proyecto fue desarrollado con fines educativos como parte de una evaluación académica.

### Responsables
<h4 align="center"> 
  <a href="https://github.com/CaroHernz">Carolina Hernández</a> | 
	<a href="https://github.com/gurrutia15">Gonzalo Urrutia</a> | 
	<a href="https://github.com/jlmansilla">Juan Luis Mansilla</a> | 
	<a href="https://github.com/lcarrilloq">Luis Carrillo</a> | 
</h4>