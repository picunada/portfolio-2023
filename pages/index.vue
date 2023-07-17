<script setup lang="ts">

</script>

<template>
  <Hero />
  <div class="page">
    <div class="text-wrapper">
      <RevealOnScroll>
        <h1 class="mouse-lg">
          Hello, I'm Picunada - a creative Web Developer focused on Frontend and Design.
        </h1>
      </RevealOnScroll>
    </div>
    <div class="grid">
      <div class="about item-1">
        <RevealOnScroll>
          <p class="mouse-md">
            I&apos;m all about turning ideas <br>
            into vibrant and impactful designs, <br>
            utilizing the power of WebGL and other frontend tools
          </p>
        </RevealOnScroll>
      </div>
      <div class="about item-2">
        <RevealOnScroll>
          <p class="mouse-md">
            Currently on the lookout for exciting job opportunities, <br>
            I&apos;m constantly expanding my knowledge <br>
            by creating cutting-edge applications
          </p>
        </RevealOnScroll>
      </div>
      <div class="about item-3">
        <RevealOnScroll>
          <p class="mouse-md">
            Having spent the past year in Vietnam, <br>
            I originally from Russia and am pursuing my studies remotely from there
          </p>
        </RevealOnScroll>
      </div>
      <div class="about item-4">
        <RevealOnScroll>
          <p class="mouse-md">
            When I&apos;m not immersed in the world of development, <br>
            you&apos;ll find me gaming and exploring the outdoors on refreshing walks.
          </p>
        </RevealOnScroll>
      </div>
      <div class="experience item-5">
        <div class="work">
          <RevealOnScroll>
            <div class="experience-header">
              experience
            </div>
            <p class="mouse-sm">
              LOCKERBOT, APR 2021 - FEB 2023 <br>
              1.5+ YEARS <br>
              SOFTWARE ENGINEER
            </p>
          </RevealOnScroll>
        </div>
        <div class="work">
          <RevealOnScroll>
            <p class="mouse-sm">
              DIGITAL SPIRIT, OCT 2020 - APR 2021 <br>
              6+ MONTHS <br>
              QA ENGINEER
            </p>
          </RevealOnScroll>
        </div>

        <div class="work">
          <RevealOnScroll>
            <div class="experience-header">
              awards
            </div>
            <p class="mouse-sm">
              TON Foundation hackathon <br>
              2nd place <br>
              10K$ award
            </p>
          </RevealOnScroll>
        </div>
      </div>
    </div>
    <div class="projects-wrapper">
      <RevealOnScroll>
        <h1 class="mouse-sm">
          Projects
        </h1>
      </RevealOnScroll>
      <div class="project-grid">
        <RevealOnScroll>
          <NuxtLink to="/garant">
            <div class="project-card mouse-md">
              garant
            </div>
          </NuxtLink>
        </RevealOnScroll>

        <RevealOnScroll>
          <NuxtLink to="/portfolio-old">
            <div class="project-card mouse-md">
              portfolio-old
            </div>
          </NuxtLink>
        </RevealOnScroll>

        <RevealOnScroll>
          <NuxtLink to="/locker">
            <div class="project-card mouse-md">
              locker-ios
            </div>
          </NuxtLink>
        </RevealOnScroll>
      </div>
    </div>
    <div class="contacts-wrapper">
      <RevealOnScroll>
        <h1 class="mouse-sm">
          Contacts
        </h1>
      </RevealOnScroll>
      <RevealOnScroll>
        <div class="contact">
          <p class="title mouse-sm">
            email
          </p>
          <p class="value mouse-sm">
            picunada.dev@gmail.com
          </p>
        </div>
      </RevealOnScroll>
      <RevealOnScroll>
        <div class="contact">
          <p class="title mouse-sm">
            telegram
          </p>
          <a href="https://t.me/picunada" target="_blank">
            <p class="value mouse-sm">
              @picunada
            </p>
          </a>
        </div>
      </RevealOnScroll>
    </div>
  </div>
  <Hero />
</template>

<style>
h1,
h2,
h3 {
  text-wrap: balance;
}
</style>

<style lang="scss" scoped>
.text-wrapper {
  font-size: 2rem;
  margin-top: 120px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-top: 120px;
  font-weight: 600;
}

.about {
  font-size: 1.6rem;
}

.experience {
  font-size: 1rem;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 16px;
}

.experience-header {
  font-size: 0.9rem;
  color: var(--secondary);
  margin-bottom: 4px;
}

.item-1 {
  grid-column: 1/3;
}

.item-2 {
  grid-column: 1/3;
  grid-row: 2;
}

.item-3 {
  grid-column: 1/3;
  grid-row: 3;
}

.item-4 {
  grid-column: 1/3;
  grid-row: 4;
}

.item-5 {
  grid-column: 3/4;
  grid-row: 1/4;
}

.projects-wrapper {
  margin-top: 120px;
  display: flex;
  flex-direction: column;
  gap: 24px;

  .project-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }

  .project-card {
    min-height: 400px;
    padding: 16px 24px;
    border: solid 1px $primary;
    border-radius: 16px;
    font-size: 2rem;
    font-weight: 800;
    display: flex;
    align-items: center;
    justify-content: center;

  }
}

.contacts-wrapper {
  margin-top: 120px;
  margin-bottom: 120px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.contact {
  font-size: 1.6rem;
  font-weight: 600;
  display: flex;
  gap: 16px;

  .title {
    color: $secondary;
  }

  .value {
    text-decoration: underline;
    text-decoration-color: transparent;
    transition: ease-in-out 0.2s;
    transition-property: text-decoration-color;

    &:hover {
      text-decoration-color: $primary;
    }
  }
}
</style>
