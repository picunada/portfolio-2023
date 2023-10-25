<script setup lang="ts">
import { gsap } from 'gsap'

const props = defineProps<{
  link?: string
  target?: string
  download?: string | boolean
}>()

const link = ref<HTMLDivElement>()
const timeline = gsap.timeline({ paused: true })

function onEnter() {
  timeline.play()
}

function onLeave() {
  timeline.reverse()
}

onMounted(() => {
  timeline.to(link.value as HTMLDivElement, {
    ease: 'power3',
    duration: 0.6,
    backgroundColor: '#000',
  }, 0)
})
</script>

<template>
  <div ref="link" class="link" @mouseenter="onEnter" @mouseleave="onLeave">
    <a :href="props.link" :target="props.target" :download="props.download">
      <slot />
    </a>
  </div>
</template>

<style lang="scss" scoped>
.link {
  position: relative;
  cursor: pointer;
  padding: 2px 4px;
  overflow: hidden;
  mix-blend-mode: difference;
}

a {
  text-decoration: none;
  color: $primary;
}
</style>
