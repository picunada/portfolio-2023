<script setup lang="ts">
import { useMediaQuery } from '@vueuse/core'
import { drawImageProp } from '@/utils/draw-image'

const { $gsap, $lenis, $router } = useNuxtApp()

const isMobile = useMediaQuery('(max-width: 678px)')

const frameCount = 120
const loadedCount = ref(0)

const animation = ref({
  frame: 0,
})
const preloaded = useState('loaded')
const imageLoaded = ref(false)
const canvas = ref<HTMLCanvasElement>()
const images = ref<HTMLImageElement[]>([])

const tween = ref<gsap.core.Tween>()

async function loadImages() {
  const currentFrame = (index: number) => `/_old-portfolio/0${index + 1 < 100 ? '0' : ''}${index + 1 < 10 ? '0' : ''}${index + 1}.webp`

  for (let i = 0; i < frameCount; i++) {
    const img = new Image()
    img.src = currentFrame(i)
    img.onload = () => loadedCount.value++
    images.value.push(img)
  }
}

watch(loadedCount, (v) => {
  if (v === frameCount) {
    imageLoaded.value = true
  }
})

watch(imageLoaded, (v) => {
  if (v) {
    canvas.value!.width = window.innerWidth
    canvas.value!.height = window.innerHeight

    const context = canvas.value!.getContext('2d')

    tween.value = $gsap.to(animation.value, {
      frame: frameCount - 1,
      snap: 'frame',
      ease: 'none',
      duration: 2,
      onUpdate: render,
      onComplete: () => {
        $gsap.fromTo('.arrow', {
          opacity: 0,
        }, {
          opacity: 1,
        })
      },
    })

    images.value[0].onload = render

    function render() {
      const img = images.value[animation.value.frame]
      const offsetX = 0.5 // center x
      const offsetY = 0.5 // center y
      canvas.value!.width = window.innerWidth
      canvas.value!.height = window.innerHeight

      context?.clearRect(0, 0, canvas.value!.width, canvas.value!.height)
      drawImageProp(context!, img, 0, 0, window.innerWidth, window.innerHeight, offsetX, offsetY)
    }
  }
})

onMounted(async () => {
  preloaded.value = true

  await loadImages()

  $lenis.options.infinite = false
})

onUnmounted(() => {
  $lenis.options.infinite = true
  tween.value?.kill()
})

definePageMeta({
  keepalive: false,
})
</script>

<template>
  <Transition name="spinner">
    <div v-if="!imageLoaded" class="spinner">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
        <path fill="currentColor" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity=".25"/><path fill="currentColor" d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z"><animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></path>
      </svg>
    </div>
  </Transition>
  <canvas ref="canvas" class="image-seq" />

  <button class="back-button mouse-sm" @click="() => $router.go(-1)">
    <svg class="mouse-sm" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
      <path class="mouse-sm" fill="currentColor" d="M10 22L0 12L10 2l1.775 1.775L3.55 12l8.225 8.225L10 22Z" />
    </svg>
  </button>

  <svg class="arrow mouse-sm" xmlns="http://www.w3.org/2000/svg" width="76" height="76" viewBox="0 0 24 24">
    <path class="pulse" fill="currentColor" d="M12 14.975q-.2 0-.375-.062T11.3 14.7l-4.6-4.6q-.275-.275-.275-.7t.275-.7q.275-.275.7-.275t.7.275l3.9 3.9l3.9-3.9q.275-.275.7-.275t.7.275q.275.275.275.7t-.275.7l-4.6 4.6q-.15.15-.325.213t-.375.062Z" />
  </svg>

  <div class="page">
    <RevealOnScroll>
      <h1 class="project--header mouse-sm">
        old-portfolio
      </h1>
    </RevealOnScroll>

    <div class="project--about">
      <div class="role">
        <div class="role--item mouse-sm">
          <h5 class="item--title mouse-sm">
            ROLE
          </h5>
          <h5 class="mouse-sm">
            Developer, Designer
          </h5>
        </div>
        <div class="role--item mouse-sm">
          <h5 class="item--title">
            Tools
          </h5>
          <div class="tools">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
              <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="m12.146 8.583l-1.3-2.09a1.046 1.046 0 0 0-1.786.017l-5.91 9.908A1.046 1.046 0 0 0 4.047 18H7.96m12.083 0c.743 0 1.201-.843.82-1.505l-4.044-7.013a.936.936 0 0 0-1.638 0l-4.043 7.013c-.382.662.076 1.505.819 1.505h8.086z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                <path d="M8 22L3 3l19 5.5z" />
                <path d="m12.573 17.58l-6.152-1.576l8.796-9.466l1.914 6.64" />
                <path d="M12.573 17.58L11 11l6.13 2.179M9.527 4.893L11 11L4.69 9.436z" />
              </g>
            </svg>
          </div>
        </div>
      </div>
      <RevealOnScroll>
        <div class="project-description">
          <p class="mouse-sm">
            In my old portfolio project, I leveraged WebGL, Three.js, Nuxt.js, and CSS to create an immersive and visually
            stunning web experience.
          </p>
          <p class="mouse-sm">
            By harnessing the power of WebGL, I was able to render 3D graphics directly in the
            browser, bringing my portfolio to life with smooth animations and interactive elements.
          </p>
          <p class="mouse-sm">
            This project helped me to develop my skills in Three.js and WebGL while creating this.
          </p>
        </div>
      </RevealOnScroll>
    </div>
  </div>
</template>
