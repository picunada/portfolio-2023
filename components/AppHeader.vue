<script setup lang="ts">
</script>

<template>
  <header>
    <div class="header-wrapper">
      <NuxtLink to="/">
        <div class="logo mouse-sm">
          Picunada - Creative Web Developer
        </div>
      </NuxtLink>
      <nav class="navigation">
        <CustomLink link="https://github.com/picunada" target="_blank">
          <p class="mouse-sm">
            Github
          </p>
        </CustomLink>
        <CustomLink link="https://www.linkedin.com/in/daniil-bezuglov-4b1418234/" target="_blank">
          <p class="mouse-sm">
            Linkedin
          </p>
        </CustomLink>
        <CustomLink link="https://twitter.com/SonzuXlayst" target="_blank">
          <p class="mouse-sm">
            Twitter
          </p>
        </CustomLink>
      </nav>
    </div>
  </header>
</template>

<style lang="scss" scoped>
header {
  position: fixed;
  width: 100vw;
  font-size: 0.9rem;
  z-index: 10;
}

.header-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  width: 100%;
}

.navigation {
  display: flex;
  gap: 24px;
  font-weight: 600;
}

.logo {
  font-weight: 600;
}
</style>
