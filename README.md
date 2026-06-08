# 🌟 Portfolio Personal Profesional - Next.js, Sanity & Tailwind CSS v4

Este es un portfolio personal moderno, altamente interactivo y 100% dinámico, diseñado específicamente para causar una excelente impresión en gerentes de contratación y reclutadores técnicos. 

La aplicación está construida utilizando **Next.js 16 (App Router)** y está completamente integrada con **Sanity CMS** como gestor de contenidos headless, permitiéndote actualizar tus datos, proyectos, habilidades e información de contacto sin necesidad de modificar el código fuente.

---

## 🚀 Características Principales

*   📱 **Diseño 100% Responsive**: Optimizado al milímetro para smartphones, tablets y pantallas de escritorio.
*   🌗 **Modo Oscuro/Claro**: Transición suave y persistente mediante `next-themes` y variantes nativas de Tailwind CSS v4.
*   🎭 **Animaciones Fluidas**: Animaciones de scroll, hover 3D y transiciones en la barra de navegación diseñadas con `framer-motion`.
*   🛠️ **CMS Headless Integrado**: Panel de administración (Sanity Studio) incrustado en la ruta `/studio` de la misma aplicación para una gestión centralizada.
*   🛡️ **Panel Singleton**: Configuración personalizada para editar tu perfil de usuario desde un único formulario protegido contra eliminaciones accidentales.
*   📧 **Formulario de Contacto Serverless**: Backend integrado en Next.js Route Handlers conectado a **Resend** para la entrega rápida de correos electrónicos.
*   💡 **Modo de Desarrollo**: El formulario de contacto simula el envío e imprime los mensajes en la consola si la API Key de Resend no está configurada, facilitando pruebas locales ágiles.
*   ⚡ **Rendimiento Optimizados (ISR)**: Regeneración Estática Incremental configurada cada 60 segundos para tiempos de respuesta instantáneos.

---

## 🛠️ Tecnologías Utilizadas

*   **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
*   **Lenguaje**: [TypeScript](https://www.typescriptlang.org/)
*   **Estilos**: [Tailwind CSS v4](https://tailwindcss.com/) (CSS-first engine)
*   **Animaciones**: [Framer Motion](https://www.framer.com/motion/)
*   **Gestor de Contenido**: [Sanity CMS](https://www.sanity.io/) (Headless CMS)
*   **Iconos**: [Lucide React](https://lucide.dev/) (con renderizador dinámico)
*   **Envíos de Email**: [Resend](https://resend.com/)

---

## 📂 Estructura del Proyecto

```text
mariano-portfolio/
├── sanity.config.ts          # Configuración del Sanity Studio y Singletons
├── SETUP_GUIDE.md            # Guía detallada en español de Sanity y Resend
├── package.json              # Dependencias y scripts
├── src/
│   ├── app/                  # Rutas principales del App Router
│   │   ├── api/contact/      # Route Handler para el envío de mails vía Resend
│   │   ├── studio/           # Ruta de Sanity Studio incrustada (/studio)
│   │   ├── layout.tsx        # Layout global (Metadata y ThemeProvider)
│   │   ├── globals.css       # Configuración CSS, Tailwind v4 y scrollbars
│   │   └── page.tsx          # Página principal (Home) con SSR/ISR
│   ├── components/           # Componentes modulares interactivos de la interfaz
│   │   ├── Navbar.tsx        # Barra de navegación animada con ThemeToggle
│   │   ├── Hero.tsx          # Panel principal con tu avatar animado en 3D
│   │   ├── About.tsx         # Información, estadísticas y destacados
│   │   ├── Projects.tsx      # Grilla de proyectos cargados desde el CMS
│   │   ├── Skills.tsx        # Habilidades agrupadas con iconos dinámicos
│   │   ├── Contact.tsx       # Formulario interactivo con validación
│   │   ├── IconRenderer.tsx  # Helper para renderizar iconos Lucide desde strings
│   │   └── ThemeProvider.tsx # Envoltorio para soporte de temas claro/oscuro
│   └── sanity/               # Configuración del cliente Sanity
│       ├── client.ts         # Inicializador y constructores de URLs
│       ├── mockData.ts       # Datos de prueba para fallback inicial
│       └── schemas/          # Modelos de base de datos de Sanity
│           ├── index.ts      # Registro de modelos
│           ├── profile.ts    # Modelo del perfil (Singleton)
│           ├── project.ts    # Modelo de proyectos cargados
│           └── skill.ts      # Modelo de habilidades
```

---

## 💻 Configuración Local

### Paso 1: Clonar e Instalar Dependencias
```bash
git clone <url-de-tu-repositorio>
cd mariano-portfolio
npm install
```

### Paso 2: Crear el archivo de Variables de Entorno
Crea un archivo llamado `.env.local` en la raíz del proyecto y agrega tus claves personales:
```env
# Sanity CMS Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=0giptsrm
NEXT_PUBLIC_SANITY_DATASET=production

# Resend Email Configuration (Sustituye por tu API Key de Resend en producción)
# RESEND_API_KEY=re_tu_api_key_aqui
# CONTACT_RECEIVER_EMAIL=tu_correo_de_notificaciones@gmail.com
```

### Paso 3: Iniciar el Servidor de Desarrollo
```bash
npm run dev
```
Abre **[http://localhost:3000](http://localhost:3000)** en tu navegador.

---

## ⚙️ Integración con Sanity CMS & Resend

El portfolio está diseñado para funcionar inmediatamente usando **datos de prueba locales** de forma que la interfaz nunca se vea vacía. Para activar tu propio contenido:

1.  **Panel CORS**: Ingresa a [sanity.io/manage](https://sanity.io/manage), ve a tu proyecto (`0giptsrm`), entra a la sección **API -> CORS Origins** y agrega `http://localhost:3000` con la opción de *Credentials* activada.
2.  **Sanity Studio**: Ve a `http://localhost:3000/studio` e inicia sesión. Completa el **Perfil de Usuario**, añade tus **Proyectos** y tus **Habilidades**.
3.  **Resend**: Regístrate en [resend.com](https://resend.com/), copia tu API Key y agrégala a tu `.env.local` para activar los envíos reales del formulario.

*Nota: Tienes instrucciones detalladas e ilustradas en el archivo [SETUP_GUIDE.md](file:///c:/Users/maria/Documents/mariano-portfolio/SETUP_GUIDE.md) en la raíz de este proyecto.*

---

## 🚀 Despliegue en Vercel

1.  Sube tu código a un repositorio privado o público en GitHub.
2.  Importa el proyecto en tu panel de [Vercel](https://vercel.com/).
3.  En la configuración de variables de entorno de Vercel, agrega las variables definidas en tu `.env.local`.
4.  Agrega la URL asignada por Vercel a los **CORS Origins** en tu panel de Sanity.
5.  ¡Haz el despliegue! Tu portfolio se compilará y actualizará dinámicamente cada vez que agregues contenido al CMS.
