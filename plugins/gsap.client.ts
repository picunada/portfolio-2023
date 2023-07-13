import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/all'

export default defineNuxtPlugin(() => {
  gsap.registerPlugin(ScrollTrigger)

  return {
    provide: {
      gsap,
    },
  }
})
