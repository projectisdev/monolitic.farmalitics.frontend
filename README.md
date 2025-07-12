# Frontend - Proyecto Final Desarrollo de Aplicaciones Web

## Clonar el repositorio

```bash
git clone https://github.com/intecwebdev/Proyecto-web-front.git
```

## Estructura del proyecto

```
metronic-tailwind-react/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── layouts/
│   ├── pages/
│   ├── routes/
│   └── main.jsx
├── .env.example
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## Ingresar al proyecto

```bash
cd Proyecto-web-front
cd metronic-tailwind-react
```

## Instalación de dependencias

### Verificar si pnpm está instalado

```bash
pnpm -v
```

### Instalar pnpm (si no está instalado)

```bash
npm install -g pnpm@latest-10
```

### Instalar dependencias del proyecto

```bash
pnpm install
```

## Ejecutar el proyecto

```bash
pnpm dev
```

La aplicación estará disponible en:  
[http://localhost:5173/application](http://localhost:5173/application)

### Exponer en red local

```bash
pnpm dev -- --host
```

## Tecnologías utilizadas

- React
- Tailwind CSS
- Vite
- Metronic Design System
