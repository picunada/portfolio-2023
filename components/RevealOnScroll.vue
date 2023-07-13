<script setup lang="ts">
const { $gsap } = useNuxtApp()

const reveal = ref<HTMLDivElement>()

onMounted(() => {
  $gsap.fromTo(reveal.value!, {
    opacity: 0,
  }, {
    scrollTrigger: {
      trigger: reveal.value,
      top: 'top top',
      toggleActions: 'play reset play reset',
      markers: false,
    },
    ease: 'power3',
    duration: 3,
    opacity: 1,
  })
})
</script>

<template>
  <div ref="reveal">
    <slot />
  </div>
</template>
