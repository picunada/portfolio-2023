import Lenis from '@studio-freight/lenis'

export default defineNuxtPlugin(() => {
  const { $router } = useNuxtApp()

  const lenis = new Lenis({
    // duration: 1.2,
    // easing: t => Math.min(1, 1.001 - 2 ** (-10 * t)), // https://www.desmos.com/calculator/brs54l4xou
    infinite: true,
  })

  function raf(time: number) {
    lenis.raf(time)
    window.requestAnimationFrame(raf)
  }

  window.requestAnimationFrame(raf)

  $router.afterEach((to, from) => {
    if (to.path !== from.path) {
      lenis.scrollTo('#__nuxt', { // your container class or id
        offset: 0,
        duration: 0,
        // easing: () => { },
        immediate: true,
      })
    }
  })

  return {
    provide: {
      lenis,
    },
  }
})
