<script lang="ts" setup>
useHead({
  title: 'Hey, I\'m Picunada',
  meta: [
    {
      name: 'description',
      content: 'Creative Web Developer.',
    },
  ],
})
</script>

<template>
  <Preloader />
  <AppHeader />
  <div class="page-wrapper">
    <slot />
  </div>

  <Cursor />
</template>
