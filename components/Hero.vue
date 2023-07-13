<script setup lang="ts">
import { gsap } from 'gsap'
import Sketch from '@/utils/webgl/app'

const canvas = ref<HTMLCanvasElement | null>()
const preloaded = useState('loaded')
const symbolsRefs = ref<HTMLParagraphElement[] | null>()
const nick = ref('picunada')

watch(preloaded, (v) => {
  if (v) {
    if (symbolsRefs.value) {
      symbolsRefs.value.forEach((ref, i) => {
        gsap.fromTo(ref, {
          translateY: '-100%',
        }, {
          ease: 'power3',
          duration: 0.6,
          delay: 0.5 + 0.02 * i,
          translateY: '0',
        })
      })
    }
  }
})

onMounted(() => {
  const app = new Sketch(canvas.value as HTMLCanvasElement)
})
</script>

<template>
  <div class="canvas-container">
    <div id="grained">
      <div class="nick-container">
        <div class="nick">
          <p v-for="symbol in nick" :key="nick.indexOf(symbol)" ref="symbolsRefs">
            {{ symbol }}
          </p>
        </div>
      </div>

      <svg class="arrow" width="38" height="156" viewBox="0 0 38 156" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 1V155" stroke="white" stroke-width="2" stroke-linecap="round" />
        <path d="M19 155L36 128" stroke="white" stroke-width="2" stroke-linecap="round" />
        <path d="M19 155L2 128" stroke="white" stroke-width="2" stroke-linecap="round" />
      </svg>

      <div class="blur" />
      <canvas ref="canvas" class="canvas" />
    </div>
  </div>
</template>

<style>
.canvas-container {
  /* position: absolute; */
  max-width: 100vw;
  max-height: 100vh;
  overflow: hidden;
  top: 0;
  left: 0;
  z-index: -10;
}

.canvas {
  position: relative;
  margin: 0;
  z-index: -2;
}

#grained {
  position: relative;
}

.blur {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  backdrop-filter: blur(30px);
  z-index: -1;
}

.nick-container {
  position: absolute;

  overflow: hidden;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  mix-blend-mode: overlay;
  z-index: 1;
}

.nick {
  display: flex;
  flex-direction: row;
  color: #ffffff;
  z-index: 1;
  font-family: 'Format1452';
  font-size: calc(100vw/2560 * 120);
  text-transform: uppercase;
  user-select: none;
}

.arrow {
  position: absolute;
  bottom: 0;
  right: 0;
  translate: -48px -50%;
  mix-blend-mode: overlay;
}
</style>
