<script setup lang="ts">
import { useMediaQuery } from '@vueuse/core'

const { $gsap, $lenis, $router } = useNuxtApp()

const isMobile = useMediaQuery('(max-width: 678px)')

const frameCount = 95
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
  const currentFrame = (index: number) => `/garant-lottie/00${index + 1 < 10 ? '0' : ''}${index + 1}.webp`

  for (let i = 0; i < frameCount; i++) {
    const img = new Image()
    img.src = currentFrame(i)
    img.onload = () => loadedCount.value++
    images.value.push(img)
  }
}

watch(loadedCount, (v) => {
  if (v === frameCount) {
    setTimeout(() => imageLoaded.value = true, 1000)
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
      duration: 1.8,
      onUpdate: render,
      onComplete: () => {
        if (isMobile) {
          $gsap.to('.arrow', {
            opacity: 1,
          })
        }
      },
    })

    images.value[0].onload = render

    function render() {
      const img = images.value[animation.value.frame]
      const offsetX = 0.5 // center x
      const offsetY = 0.5 // center y
      canvas.value!.width = window.innerWidth
      canvas.value!.height = window.innerHeight

      context?.clearRect(0, 0, canvas.value!.width / 2, canvas.value!.height / 2)
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

  <svg
    v-if="!isMobile" class="arrow" width="38" height="156" viewBox="0 0 38 156" fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19 1V155" stroke="white" stroke-width="2" stroke-linecap="round" />
    <path d="M19 155L36 128" stroke="white" stroke-width="2" stroke-linecap="round" />
    <path d="M19 155L2 128" stroke="white" stroke-width="2" stroke-linecap="round" />
  </svg>

  <div class="page">
    <RevealOnScroll>
      <h1 class="project--header mouse-sm">
        Guarantee calc
      </h1>
    </RevealOnScroll>

    <div class="project--about">
      <div class="role">
        <div class="role--item mouse-sm">
          <h5 class="item--title">
            COMPANY
          </h5>
          <h5> Multitender</h5>
        </div>
        <div class="role--item mouse-sm">
          <h5 class="item--title">
            ROLE
          </h5>
          <h5>Developer, Designer</h5>
        </div>
        <div class="role--item mouse-sm">
          <h5 class="item--title">
            Tools
          </h5>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="80" height="16" viewBox="0 0 512 104">
              <path
                fill="white"
                d="M429.543.043v16.46h-35.377V103.1h-17.69V16.504h-36.114V.043h89.181Zm3.977 93.24c1.246 0 2.336.448 3.259 1.346c.936.897 1.402 1.972 1.415 3.224a4.476 4.476 0 0 1-.66 2.327a4.776 4.776 0 0 1-1.714 1.665a4.422 4.422 0 0 1-2.3.626c-1.296 0-2.398-.449-3.32-1.346c-.923-.898-1.38-1.985-1.368-3.272c-.011-1.252.445-2.327 1.368-3.224c.922-.898 2.024-1.346 3.32-1.346ZM82.916 103.1L17.69 22.028v81.03H0V0h22.111l82.406 102.329l.001-85.825l-.007-16.461h89.18v16.46h-71.484v26.48h57.488v16.461h-57.488V86.64h71.485v16.46H82.916Zm167.469-43.813L261.978 73.7l-23.755 29.522h-23.215l35.377-43.935ZM238.223.086l29.93 37.17L297.989.2l23.15-.035l-41.396 51.485l41.463 51.493h-23.217L215.074.086h23.149Zm225.488 58.97h7.838v30.2c-.011 2.775-.612 5.148-1.785 7.145c-1.187 1.995-2.83 3.519-4.938 4.594c-2.098 1.062-4.555 1.606-7.348 1.606c-2.553 0-4.841-.46-6.879-1.358c-2.038-.898-3.655-2.244-4.842-4.016c-1.2-1.771-1.787-3.98-1.787-6.625h7.852c.012 1.157.275 2.16.778 3a5.01 5.01 0 0 0 2.086 1.924c.898.45 1.93.674 3.091.674c1.26 0 2.338-.26 3.213-.792c.874-.52 1.546-1.299 2.014-2.338c.455-1.028.695-2.303.707-3.815v-30.2Zm40.09 11.81c-.19-1.83-1.03-3.26-2.492-4.275c-1.475-1.028-3.38-1.535-5.718-1.535c-1.64 0-3.055.248-4.23.732c-1.174.496-2.085 1.157-2.709 1.996c-.622.838-.934 1.795-.959 2.87c0 .897.216 1.677.635 2.326a5.22 5.22 0 0 0 1.714 1.666a11.5 11.5 0 0 0 2.398 1.145c.886.307 1.774.567 2.66.78l4.087 1.004c1.643.378 3.237.885 4.759 1.535c1.521.638 2.9 1.453 4.11 2.433c1.211.98 2.17 2.161 2.877 3.543c.707 1.382 1.067 3 1.067 4.866c0 2.515-.647 4.724-1.954 6.637c-1.306 1.902-3.188 3.39-5.657 4.465c-2.457 1.063-5.43 1.606-8.929 1.606c-3.38 0-6.328-.52-8.81-1.559c-2.492-1.027-4.434-2.54-5.837-4.524c-1.402-1.984-2.157-4.405-2.265-7.251h7.768c.107 1.488.587 2.728 1.402 3.732c.826.992 1.905 1.724 3.224 2.22c1.33.485 2.816.733 4.458.733c1.714 0 3.224-.26 4.53-.768c1.295-.508 2.313-1.216 3.045-2.138c.743-.91 1.115-1.984 1.127-3.212c-.012-1.122-.349-2.055-.996-2.788c-.659-.732-1.57-1.346-2.733-1.842c-1.173-.496-2.54-.945-4.098-1.334l-4.962-1.252c-3.584-.91-6.424-2.291-8.498-4.146c-2.085-1.854-3.116-4.31-3.116-7.393c0-2.527.695-4.748 2.098-6.65c1.39-1.9 3.296-3.377 5.705-4.428c2.42-1.063 5.154-1.583 8.197-1.583c3.093 0 5.801.52 8.139 1.583c2.336 1.051 4.171 2.515 5.5 4.381c1.331 1.867 2.027 4.004 2.063 6.425h-7.6Z"
              />
            </svg>
          </div>
        </div>
      </div>
      <RevealOnScroll>
        <div class="project-description">
          <p class="mouse-sm">
            Guarantee calc is a site for calculating bank guarantees for procurement winners is a web-based platform
            specifically designed to assist procurement winners in determining the required amount of bank guarantee for
            their awarded contracts.
          </p>

          <p class="mouse-sm">
            This platform aims to streamline the process of calculating and obtaining bank
            guarantees, which are financial instruments used to provide assurance to the procuring entity that the
            contract
            will be fulfilled as per the agreed terms and conditions.
          </p>
        </div>
      </RevealOnScroll>
    </div>
  </div>
</template>
