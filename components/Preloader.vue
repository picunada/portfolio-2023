<script setup lang="ts">
import { gsap } from 'gsap'

const preloaded = useState('loaded')
const loadTimeline = gsap.timeline({ paused: true })
const wrap = ref<HTMLDivElement>()
const wrapTimeline = gsap.timeline({ repeat: -1 })

watch(preloaded, (v) => {
  if (v) {
    loadTimeline.play()
    wrapTimeline.pause()
  }
  else {
    loadTimeline.reverse()
    wrapTimeline.play()
  }
})

onMounted(() => {
  loadTimeline.add(gsap.to('.preloader', {
    ease: 'power3',
    translateY: '-100%',
  }))
  wrapTimeline.to(wrap.value!, {
    duration: 0.7,
    ease: 'power4',
    yPercent: -20,
  })
    .to(wrap.value!, {
      duration: 0.7,
      ease: 'power4',
      yPercent: -40,
    })
    .to(wrap.value!, {
      duration: 0.7,
      ease: 'power4',
      yPercent: -60,
    })
    .to(wrap.value!, {
      duration: 0.7,
      ease: 'power4',
      yPercent: -80,
    })
})
</script>

<template>
  <div class="preloader">
    <div class="wrapper">
      <div class="roll">
        <div ref="wrap" class="wrap">
          <h1 class="mouse-sm">
            Picunada
          </h1>
          <h1 class="mouse-sm">
            Developer
          </h1>
          <h1 class="mouse-sm">
            Designer
          </h1>
          <h1 class="mouse-sm">
            WebGL
          </h1>
          <h1 class="mouse-sm">
            Picunada
          </h1>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.preloader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: white;
  z-index: 100;
}

.wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: $background;
}

.roll {
  position: relative;
  height: 2.6rem;
  overflow: hidden;
  text-align: center;
  justify-content: center;

  h1 {
    font-size: 2rem;
    line-height: 140%;
  }
}

.wrap {
  display: flex;
  flex-direction: column;
}
</style>
