# 🌟 Mi Portafolio Personal y Profesional - Mariano

¡Bienvenido al código fuente de mi portafolio! Este sitio web es mi carta de presentación al mundo digital. Ha sido diseñado para ser visualmente impactante, altamente interactivo, rápido y fácil de usar, mostrando mi trayectoria profesional, mis proyectos y las tecnologías que utilizo en mi día a día como desarrollador.

---

## 🎨 ¿Qué es este sitio web y cómo está organizado?

Si eres reclutador, gerente de contratación, cliente o simplemente estás de visita, aquí te explico de forma sencilla qué encontrarás en cada sección de la página y qué hace especial a este sitio:

### 1. 🧭 Barra de Navegación y Control de Tema
Ubicada en la parte superior, te permite moverte rápidamente por las distintas secciones del sitio sin recargar la página. Incluye un botón interactivo para alternar entre **Modo Claro** y **Modo Oscuro** usando una transición fluida y moderna similar a una onda expansiva.

### 🚀 2. Pantalla de Inicio (Hero)
Es la primera impresión de la página. Cuenta con un efecto de **meteoritos animados y destellos de luz** que caen y explotan dinámicamente según la altura de tu pantalla, un avatar interactivo y un resumen rápido de mi perfil.

### 👤 3. Sobre Mí (Historia y Descargas)
Aquí puedes conocer más sobre quién soy, mis pasiones y mi visión profesional. También muestra estadísticas de mi carrera y cuenta con un botón interactivo para **descargar mi Currículum Vitae (CV) actualizado en formato PDF** con un solo clic.

### 🎓 4. Trayectoria Académica (Educación)
Una línea de tiempo interactiva iluminada con luces de neón que organiza mis estudios, cursos y logros académicos. Cada tarjeta muestra las fechas y los detalles de la institución, además de incluir un botón para **"Ver Certificado"** que abre el diploma digital de cada curso directamente en PDF.

### 💻 5. Galería de Proyectos
Una muestra de las aplicaciones y sitios web que he construido. Cada proyecto se visualiza como una tarjeta tridimensional que reacciona al movimiento del ratón. Puedes ver detalles, capturas de pantalla, las tecnologías con las que fue construido y acceder a los botones para **"Ver Código" (en GitHub)** o **"Visitar Sitio"** para probar la aplicación en vivo.

### 🛠️ 6. Habilidades Técnicas
Una grilla organizada por categorías (Desarrollo Frontend, Backend, Bases de Datos, etc.) que muestra las tecnologías en las que tengo experiencia. Cada habilidad tiene su logotipo oficial vectorizado a color, adaptándose con filtros visuales si estás usando el tema claro u oscuro.

### 📬 7. Formulario de Contacto
Un formulario inteligente donde puedes redactar un mensaje para escribirme directamente. Cuenta con etiquetas flotantes que reaccionan al escribir, validación inteligente de campos (como verificar si el correo es real) y alertas animadas que confirman si el mensaje se envió correctamente.

---

## ⚙️ ¿Cómo funciona por dentro? (Explicado sin tecnicismos)

Para lograr que el sitio sea rápido, seguro y extremadamente fácil de actualizar, el sistema utiliza tres herramientas que trabajan en equipo:

1. **La Fachada Visual (Next.js & Tailwind CSS)**: Es la estructura del sitio y las reglas de diseño. Hace que la página cargue en milisegundos y que se adapte perfectamente a teléfonos móviles, tablets y computadoras de escritorio.
2. **El Panel de Control (Sanity CMS)**: Es un administrador privado e intuitivo. Me permite añadir nuevos proyectos, subir certificados académicos o cambiar mis datos de contacto a través de un panel visual fácil de usar, sin necesidad de escribir código ni volver a programar la página.
3. **El Mensajero Seguro (Resend)**: Cuando me envías un mensaje desde el formulario de contacto, este sistema toma tu mensaje, lo convierte en un correo con un diseño moderno y pulido, y lo deposita en mi bandeja de entrada de Gmail al instante.

---

## 🔧 Para Desarrolladores (Instalación y Configuración Técnica)

Si eres programador o quieres examinar a fondo la arquitectura y el código de la aplicación, a continuación tienes las especificaciones técnicas y los pasos para correr el proyecto localmente.

### 📂 Estructura del Proyecto
```text
mariano-portfolio/
├── sanity.config.ts          # Configuración del panel Sanity Studio y Singletons
├── SETUP_GUIDE.md            # Guía detallada en español de Sanity y Resend
├── package.json              # Dependencias y scripts
├── src/
│   ├── app/                  # Rutas principales del App Router
│   │   ├── api/contact/      # API Route Handler para envío de correos vía Resend
│   │   ├── studio/           # Ruta del Sanity Studio incrustado (/studio)
│   │   ├── layout.tsx        # Layout global (Metadata y ThemeProvider)
│   │   ├── globals.css       # Estilos globales, Tailwind v4 y barras de scroll
│   │   └── page.tsx          # Página principal (Home) con SSR/ISR
│   ├── components/           # Componentes modulares reutilizables de la interfaz
│   │   ├── Navbar.tsx        # Barra de navegación animada con ThemeToggle
│   │   ├── Hero.tsx          # Panel principal con meteoritos y avatar animado
│   │   ├── About.tsx         # Bio del programador, estadísticas y enlace al CV
│   │   ├── Education.tsx     # Línea de tiempo interactiva con visualización de PDFs
│   │   ├── Projects.tsx      # Bento grid de proyectos cargados desde el CMS
│   │   ├── Skills.tsx        # Habilidades agrupadas con logos dinámicos
│   │   ├── Contact.tsx       # Formulario interactivo con alertas
│   │   ├── IconRenderer.tsx  # Helper para renderizar iconos vectoriales
│   │   └── ThemeProvider.tsx # Proveedor de temas claro/oscuro (Next-Themes)
│   └── sanity/               # Configuración del cliente Sanity
│       ├── client.ts         # Inicializador y constructores de URLs de archivos
│       ├── mockData.ts       # Datos de prueba locales (Fallback para testing)
│       └── schemas/          # Modelos de bases de datos de Sanity
│           ├── index.ts      # Registro centralizado de esquemas
│           ├── profile.ts    # Modelo de perfil único (Singleton)
│           ├── project.ts    # Modelo de proyectos
│           ├── education.ts  # Modelo de educación y certificados
│           └── skill.ts      # Modelo de habilidades y categorías
```

### 💻 Configuración Local

#### Paso 1: Clonar el Repositorio e Instalar Dependencias
```bash
git clone <url-de-tu-repositorio>
cd mariano-portfolio
npm install
```

#### Paso 2: Crear el Archivo de Variables de Entorno
Crea un archivo llamado `.env.local` en la raíz del proyecto y agrega las siguientes claves:
```env
# Configuración de Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=0giptsrm
NEXT_PUBLIC_SANITY_DATASET=production

# Configuración de Resend Email
RESEND_API_KEY=re_tu_api_key_aqui
CONTACT_RECEIVER_EMAIL=tu_correo_de_notificaciones@gmail.com
```

#### Paso 3: Iniciar el Servidor de Desarrollo
```bash
npm run dev
```
Abre **[http://localhost:3000](http://localhost:3000)** en tu navegador para ver la aplicación corriendo localmente en modo desarrollo.

### ⚙️ Integraciones y API

1. **CORS Origins en Sanity**: Si cambias de entorno de hosting, ve a [sanity.io/manage](https://sanity.io/manage), selecciona tu proyecto, entra a **API -> CORS Origins** y agrega la URL de tu sitio (ej. `http://localhost:3000`) marcando la opción *Allow credentials*.
2. **Sanity Studio**: Accede a `/studio` en tu navegador para añadir o editar el perfil, proyectos y habilidades en la base de datos de Sanity.
3. **Resend API**: Regístrate en [resend.com](https://resend.com) para obtener tu API Key. Si usas el plan sandbox gratuito, recuerda que el correo de destino (`CONTACT_RECEIVER_EMAIL`) debe ser la misma dirección con la que te registraste en Resend.

### 🚀 Despliegue en Vercel

1. Sube tu código a un repositorio en tu cuenta de GitHub/GitLab.
2. Crea un nuevo proyecto en [Vercel](https://vercel.com) e impórtalo.
3. Configura las variables de entorno de tu archivo `.env.local` dentro del asistente de variables de Vercel.
4. Una vez desplegado, copia el dominio provisto por Vercel y añádelo a la lista de **CORS Origins** de tu panel de Sanity.
5. ¡Listo! Tu sitio estará en producción con compilaciones optimizadas y regeneración de contenido en tiempo real.
