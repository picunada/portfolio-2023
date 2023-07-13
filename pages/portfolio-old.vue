<script setup lang="ts">
import { drawImageProp } from '@/utils/draw-image'

const { $gsap, $lenis } = useNuxtApp()

const frameCount = 50
const loadedCount = ref(0)

const animation = ref({
  frame: 0,
})
const preloaded = useState('loaded')
const imageLoaded = ref(false)
const canvas = ref<HTMLCanvasElement>()
const images = ref<HTMLImageElement[]>([])

async function loadImages() {
  const currentFrame = (index: number) => `/_old-portfolio/${index + 1}.webp`

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
    preloaded.value = true
  }
})

watch(imageLoaded, (v) => {
  if (v) {
    canvas.value!.width = window.innerWidth
    canvas.value!.height = window.innerHeight

    const context = canvas.value!.getContext('2d')

    $gsap.to(animation.value, {
      frame: frameCount - 1,
      snap: 'frame',
      ease: 'none',
      duration: 2.2,
      onUpdate: render,
      onComplete: () => {
        $gsap.to('.arrow', {
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
  await loadImages()

  $lenis.options.infinite = false
})

onUnmounted(() => {
  $lenis.options.infinite = true
})

definePageMeta({
  keepalive: false,
})
</script>

<template>
  <canvas ref="canvas" class="image-seq" />

  <NuxtLink class="mouse-sm" to="/">
    <svg class="back-button mouse-sm" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
      <path class="mouse-sm" fill="currentColor" d="M10 22L0 12L10 2l1.775 1.775L3.55 12l8.225 8.225L10 22Z" />
    </svg>
  </NuxtLink>

  <svg class="arrow" width="38" height="156" viewBox="0 0 38 156" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 1V155" stroke="white" stroke-width="2" stroke-linecap="round" />
    <path d="M19 155L36 128" stroke="white" stroke-width="2" stroke-linecap="round" />
    <path d="M19 155L2 128" stroke="white" stroke-width="2" stroke-linecap="round" />
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
      </div>
      <RevealOnScroll>
        <div>
          <p class="mouse-sm">
            In my old portfolio project, I leveraged WebGL, Three.js, Nuxt.js, and CSS to create an immersive and visually
            stunning web experience. By harnessing the power of WebGL, I was able to render 3D graphics directly in the
            browser, bringing my portfolio to life with smooth animations and interactive elements.
          </p>
          <p class="mouse-sm">
            I've developed my skills in Three.js and WebGL while creating this.
          </p>
        </div>
      </RevealOnScroll>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.image-seq {
  width: 100vw;
  height: 100vh;
  object-fit: cover;
}

.project--header {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 24px;
}

.project--about {
  font-size: 1.6rem;
  font-weight: 500;
  display: flex;
  gap: 24px;
}

.role {
  min-width: 300px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  .role--item {
    display: flex;
    gap: 16px;
    text-wrap: balance;

    .item--title {
      color: $secondary;
    }
  }
}

.arrow {
  position: absolute;
  opacity: 0;
  bottom: 50%;
  right: 0;
  translate: -48px 50%;
  z-index: 2;
  mix-blend-mode: normal;
}

.back-button {
  position: fixed;
  color: white;
  top: 5%;
  left: 0;
  translate: 48px 100%;
  z-index: 2;
}
</style>
