<script setup lang="ts">
const { $gsap, $lenis, $router } = useNuxtApp()

const frameCount = 70
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
  const currentFrame = (index: number) => `/locker-ios/00${index + 1 < 10 ? '0' : ''}${index + 1}.webp`

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

    tween.value = $gsap.to(animation.value, {
      frame: frameCount - 1,
      snap: 'frame',
      ease: 'none',
      duration: 1.2,
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
  tween.value?.kill()
})

definePageMeta({
  keepalive: false,
})
</script>

<template>
  <canvas ref="canvas" class="image-seq" />

  <button class="back-button mouse-sm" @click="() => $router.go(-1)">
    <svg class="mouse-sm" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
      <path class="mouse-sm" fill="currentColor" d="M10 22L0 12L10 2l1.775 1.775L3.55 12l8.225 8.225L10 22Z" />
    </svg>
  </button>

  <svg class="arrow" width="38" height="156" viewBox="0 0 38 156" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 1V155" stroke="white" stroke-width="2" stroke-linecap="round" />
    <path d="M19 155L36 128" stroke="white" stroke-width="2" stroke-linecap="round" />
    <path d="M19 155L2 128" stroke="white" stroke-width="2" stroke-linecap="round" />
  </svg>

  <div class="page">
    <RevealOnScroll>
      <h1 class="project--header mouse-sm">
        locker-ios
      </h1>
    </RevealOnScroll>

    <div class="project--about">
      <div class="role">
        <div class="role--item mouse-sm">
          <h5 class="item--title">
            COMPANY
          </h5>
          <h5> Lockerbot.io </h5>
        </div>
        <div class="role--item mouse-sm">
          <h5 class="item--title">
            ROLE
          </h5>
          <h5>Developer</h5>
        </div>
      </div>
      <RevealOnScroll>
        <div>
          <p class="mouse-sm">
            Guarantee calc is a site for calculating bank guarantees for procurement winners is a web-based platform
            specifically designed to assist procurement winners in determining the required amount of bank guarantee for
            their awarded contracts. This platform aims to streamline the process of calculating and obtaining bank
            guarantees, which are financial instruments used to provide assurance to the procuring entity that the
            contract
            will be fulfilled as per the agreed terms and conditions.
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
  cursor: pointer;
  position: fixed;
  color: white;
  top: 5%;
  left: 0;
  translate: 48px 100%;
  z-index: 2;
}
</style>
