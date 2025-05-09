# 🕒 Sistema de Gestión de Horas de Servicio de Funval

Este proyecto es una plataforma web desarrollada con React y TailwindCSS que permite a instituciones gestionar el registro, validación y seguimiento de horas de servicio realizadas por estudiantes. La aplicación también incluye roles administrativos y de revisión para garantizar el control del proceso.


## 📚 Funcionalidades principales

### Para Estudiantes
- Registro de horas de servicio con soporte de carga de archivos PDF.
- Visualización de registros realizados.
- Edición de registros que aún no han sido validados.
- Acceso y actualización a su perfil personal.

### Para Revisores/Administradores
- Registro y gestión de cuentas de estudiantes.
- Visualización y filtrado de reportes enviados.
- Aprobación o rechazo de reportes.
- Actualización de datos de estudiantes.
- Visualización de estadísticas por estudiante.

## ⚙️ Tecnologías utilizadas

| Herramienta       | Descripción                                      |
|-------------------|--------------------------------------------------|
| React             | Librería principal para la construcción de UI.   |
| Vite              | Empaquetador rápido para desarrollo React.       |
| TailwindCSS       | Framework de diseño basado en clases utilitarias.|
| Axios             | Cliente HTTP para consumo de APIs.               |
| React Router      | Enrutamiento SPA.                                |
| Context API       | Manejo de estado global (sesión).                |
| ESLint            | Linter para calidad de código.                   |

## 🗂️ Estructura del proyecto

```
📦 service-hour-fun
├── public/                 # Recursos estáticos (imágenes, íconos, logos)
├── src/
│   ├── axios/              # Módulos de conexión con la API
│   ├── components/         # Componentes reutilizables (tarjetas, aside, etc.)
│   ├── context/            # Gestión del estado global (auth)
│   ├── hooks/              # Hooks personalizados
│   ├── pages/              # Páginas y vistas principales
│   ├── App.jsx             # Componente raíz de la aplicación
│   ├── index.css           # Estilos base (Tailwind)
│   └── main.jsx            # Punto de entrada del proyecto
├── package.json            # Configuraciones y dependencias
├── vite.config.js          # Configuraciones del bundler Vite
├── index.html              # Plantilla HTML base
└── README.md               # Documentación del proyecto
```





## 🔧 Instalación y ejecución

1. **Clona el repositorio**
```bash
git clone https://github.com/usuario/service-hour-fun.git
cd service-hour-fun
```

2. **Instala las dependencias**
```bash
npm install
```

3. **Inicia el entorno de desarrollo**
```bash
npm run dev
```

---

## 🌐 Consideraciones

- Instalar previamente npm, Vite, TailWind, Node.js, React y Axios 
- La dirección base de la API se encuentra configurada en `src/axios/instance.js`.

---

## 📝 Licencia

Proyecto ha sido desarrollado con fines educativos para Funval.

Autores del Proyecto.
- Adriana Sheila Aquino Blanco
- Wilson Jacob Guerrero Chaves
- Moises Mahonri Javier López
- Julio César Ramirez Quezada
- Miguel Ángel Cornejo Durand (Lider de Grupo)

