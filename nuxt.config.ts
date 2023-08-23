// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      link: [{ rel: 'icon', type: 'image/png', href: '/Icon.svg' }],
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/_colors.scss" as *;',
        },
      },
    },
  },
  css: ['~/assets/main.scss'],
  modules: [
    // Simple usage
    '@nuxtjs/fontaine',
  ],
  imports: {
    dirs: ['./stores', './components/ui', 'utils'],
  },
})
