# Guía de Configuración del Portfolio

Este portfolio está diseñado para funcionar de inmediato utilizando datos de prueba (fallbacks locales). Para conectarlo con tu cuenta de **Sanity CMS** y **Resend**, sigue estos sencillos pasos.

---

## 1. Configuración de Variables de Entorno

Crea un archivo llamado `.env.local` en la raíz del proyecto y agrega las siguientes variables:

```env
# Sanity CMS Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=tu_proyecto_id_aqui
NEXT_PUBLIC_SANITY_DATASET=production

# Resend Email Configuration
RESEND_API_KEY=re_tu_api_key_aqui
CONTACT_RECEIVER_EMAIL=tu_correo_donde_recibiras_mensajes@gmail.com
```

---

## 2. Integrar Sanity CMS (Headless CMS)

Sanity se utiliza para cargar tus proyectos y habilidades dinámicamente sin tocar el código.

### Paso 2.1: Crear el proyecto en Sanity
1. Ve a [sanity.io](https://www.sanity.io/) y regístrate o inicia sesión.
2. Crea un nuevo proyecto desde el panel de control de Sanity (o corre `npx sanity@latest init` en una carpeta vacía si prefieres la CLI).
3. Copia el **Project ID** y colócalo en tu `.env.local` como `NEXT_PUBLIC_SANITY_PROJECT_ID`.
4. En el panel del proyecto de Sanity, ve a la pestaña **API** -> **CORS Origins** y agrega la URL de desarrollo local `http://localhost:3000` (con credenciales habilitadas) y luego la URL final de producción en Vercel para permitir solicitudes del sitio web.

### Paso 2.2: Usar el Sanity Studio Integrado
1. Corre el proyecto localmente con `npm run dev`.
2. Dirígete a [http://localhost:3000/studio](http://localhost:3000/studio) en tu navegador.
3. Se te solicitará iniciar sesión con tu cuenta de Sanity.
4. Una vez dentro de la interfaz gráfica, podrás empezar a crear y publicar:
   - **Proyectos**: Agrega el título, slug (se autogenera), sube capturas, agrega tecnologías y enlaces.
   - **Habilidades**: Agrega habilidades con el nombre del ícono de [Lucide](https://lucide.dev/icons) correspondiente (ej. `Code`, `Database`, `Cpu`, `Globe`).
5. Apenas publiques un documento, se reflejará automáticamente en la página de inicio (recarga para ver los cambios).

---

## 3. Integrar Formulario de Contacto (Resend)

Resend gestiona los envíos de correos de forma profesional y gratuita.

1. Regístrate gratis en [resend.com](https://resend.com/).
2. Ve a la sección **API Keys** y crea una llave.
3. Cópiala y pégala en tu `.env.local` como `RESEND_API_KEY`.
4. Agrega tu correo electrónico personal en `CONTACT_RECEIVER_EMAIL` para saber a dónde te llegarán las notificaciones de los reclutadores.
   * *Nota: La cuenta gratuita de Resend por defecto solo permite enviar correos a tu propia dirección registrada (usando `onboarding@resend.dev` como remitente). Esto es ideal para portfolios personales.*

---

## 4. Desarrollo Local y Despliegue

### Ejecutar localmente
```bash
npm run dev
```
Abre [http://localhost:3000](http://localhost:3000) para ver tu portfolio.

### Desplegar en Vercel
1. Sube tu código a un repositorio de GitHub.
2. Importa el repositorio en [Vercel](https://vercel.com/).
3. En la sección de **Environment Variables** de Vercel, agrega las mismas llaves definidas en tu `.env.local`.
4. ¡Listo! Tu portfolio se compilará y desplegará con soporte de ISR y Studio dinámico.
