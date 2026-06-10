import { defineField, defineType } from 'sanity'
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list'

export const skill = defineType({
  name: 'skill',
  title: 'Habilidad',
  type: 'document',
  orderings: [orderRankOrdering],
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Categoría',
      type: 'reference',
      to: [{ type: 'skillCategory' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icono del Skill (FontAwesome)',
      type: 'string',
      description: 'Elige el icono de la lista de FontAwesome para esta habilidad.',
      options: {
        list: [
          // Frontend
          { title: 'React (Real Logo)', value: 'devicon-react-original' },
          { title: 'Next.js (Real Logo)', value: 'devicon-nextjs-original' },
          { title: 'Vue.js 3 (Real Logo)', value: 'devicon-vuejs-original' },
          { title: 'Vuetify (Real Logo)', value: 'devicon-vuetify-original' },
          { title: 'JavaScript ES6+ (Real Logo)', value: 'devicon-javascript-original' },
          { title: 'TypeScript (Real Logo)', value: 'devicon-typescript-original' },
          { title: 'HTML5 (Real Logo)', value: 'devicon-html5-original' },
          { title: 'CSS3 (Real Logo)', value: 'devicon-css3-original' },
          { title: 'Tailwind CSS (Real Logo)', value: 'devicon-tailwindcss-original' },
          { title: 'Sass / SCSS (Real Logo)', value: 'devicon-sass-original' },
          { title: 'Bootstrap (Real Logo)', value: 'devicon-bootstrap-original' },
          { title: 'Angular (Real Logo)', value: 'devicon-angular-original' },

          // Backend & Lenguajes
          { title: 'Node.js (Real Logo)', value: 'devicon-nodejs-original' },
          { title: 'Express.js (Real Logo)', value: 'devicon-express-original' },
          { title: 'Python (Real Logo)', value: 'devicon-python-original' },
          { title: 'PHP (Real Logo)', value: 'devicon-php-original' },
          { title: 'Laravel (Real Logo)', value: 'devicon-laravel-original' },
          { title: 'Java (Real Logo)', value: 'devicon-java-original' },
          { title: 'Rust (Real Logo)', value: 'devicon-rust-original' },
          { title: 'Swift (Real Logo)', value: 'devicon-swift-original' },

          // Bases de Datos & Cloud
          { title: 'MySQL (Real Logo)', value: 'devicon-mysql-original' },
          { title: 'PostgreSQL (Real Logo)', value: 'devicon-postgresql-original' },
          { title: 'MongoDB (Real Logo)', value: 'devicon-mongodb-original' },
          { title: 'Firebase (Real Logo)', value: 'devicon-firebase-original' },
          { title: 'Serverless Functions (faBolt)', value: 'faBolt' },

          // Herramientas & DevOps
          { title: 'Git (Real Logo)', value: 'devicon-git-original' },
          { title: 'GitHub (Real Logo)', value: 'devicon-github-original' },
          { title: 'Vercel (Real Logo)', value: 'devicon-vercel-original' },
          { title: 'VS Code (Real Logo)', value: 'devicon-vscode-original' },
          { title: 'Vite (Real Logo)', value: 'devicon-vite-original' },
          { title: 'Postman (Real Logo)', value: 'devicon-postman-original' },
          { title: 'REST APIs (faNetworkWired - API/Red)', value: 'faNetworkWired' },
          { title: 'Docker (Real Logo)', value: 'devicon-docker-original' },
          { title: 'NPM (Real Logo)', value: 'devicon-npm-original' },
          { title: 'Figma (Real Logo)', value: 'devicon-figma-original' },
          { title: 'WordPress (Real Logo)', value: 'devicon-wordpress-original' },
          { title: 'Sanity CMS (Real Logo)', value: 'devicon-sanity-original' },
          { title: 'Terminal / CLI (faTerminal)', value: 'faTerminal' },
          { title: 'Configuración (faGear)', value: 'faGear' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    orderRankField({ type: 'skill' }),
    defineField({
      name: 'order',
      title: 'Orden (Manual Fallback)',
      type: 'number',
      initialValue: 0,
      description: 'Orden manual opcional si no se utiliza el drag-and-drop.',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      categoryTitle: 'category.title',
    },
    prepare(selection) {
      const { title, categoryTitle } = selection
      return {
        title,
        subtitle: categoryTitle ? `Categoría: ${categoryTitle}` : 'Sin categoría',
      }
    },
  },
})
