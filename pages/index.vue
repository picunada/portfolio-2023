<script setup lang="ts">
</script>

<template>
  <Hero />
  <div class="page">
    <div class="text-wrapper">
      <RevealOnScroll>
        <h1 class="mouse-lg">
          Hello, I'm Picunada - a creative Fullstack Web Developer.
        </h1>
      </RevealOnScroll>
    </div>
    <div class="grid">
      <div class="about item-1">
        <RevealOnScroll>
          <p class="mouse-md">
            I&apos;m all about turning ideas <br>
            into vibrant and impactful designs, <br>
            utilizing the power of WebGL and other frontend tools.
          </p>
        </RevealOnScroll>
      </div>
      <div class="about item-2">
        <RevealOnScroll>
          <p class="mouse-md">
            I&apos;m also experienced in backend technologies <br>
            I've participated in system design of few projects <br>
            using microservice architecture.
          </p>
        </RevealOnScroll>
      </div>
      <div class="about item-3">
        <RevealOnScroll>
          <p class="mouse-md">
            Currently on the lookout for exciting job opportunities, <br>
            I&apos;m constantly expanding my knowledge <br>
            by creating cutting-edge applications.
          </p>
        </RevealOnScroll>
      </div>
      <div class="about item-4">
        <RevealOnScroll>
          <p class="mouse-md">
            Having spent the past year in Vietnam, <br>
            I originally from Russia and am pursuing my studies remotely from there
          </p>
        </RevealOnScroll>
      </div>
      <div class="about item-5">
        <RevealOnScroll>
          <p class="mouse-md">
            When I&apos;m not immersed in the world of development, <br>
            you&apos;ll find me gaming and exploring the outdoors on refreshing walks.
          </p>
        </RevealOnScroll>
      </div>
      <div class="experience item-6">
        <div class="work">
          <RevealOnScroll>
            <div class="experience-header">
              experience
            </div>
          </RevealOnScroll>
        </div>
        <div class="work">
          <RevealOnScroll>
            <p class="mouse-sm">
              MULTITENDER, APR 2023 - NOW <br>
              6+ MONTHS <br>
              SOFTWARE ENGINEER
            </p>
          </RevealOnScroll>
        </div>
        <div class="work">
          <RevealOnScroll>
            <p class="mouse-sm">
              LOCKERBOT, APR 2021 - APR 2023 <br>
              2 YEARS <br>
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
          </RevealOnScroll>
        </div>
        <div class="work">
          <RevealOnScroll>
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
        <h2 class="mouse-sm section-header">
          projects
        </h2>
      </RevealOnScroll>
      <div class="project-grid">
        <RevealOnScroll>
          <NuxtLink to="/garant">
            <div class="project-card garant mouse-md"
              :style="{ backgroundImage: `url('/project-images/garant-calc-hero.jpg')`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }" />
          </NuxtLink>
        </RevealOnScroll>

        <RevealOnScroll>
          <NuxtLink to="/portfolio-old">
            <div class="project-card mouse-md"
              :style="{ backgroundImage: `url('/project-images/portfolio-old-hero.jpg')`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }" />
          </NuxtLink>
        </RevealOnScroll>

        <RevealOnScroll>
          <NuxtLink to="/locker">
            <div class="project-card locker mouse-md"
              :style="{ backgroundImage: `url('/project-images/locker-hero.jpg')`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }" />
          </NuxtLink>
        </RevealOnScroll>
      </div>
    </div>
    <RevealOnScroll>
      <h1 class="mouse-sm section-header">
        contacts
      </h1>
    </RevealOnScroll>
    <div class="contacts-wrapper">
      <RevealOnScroll>
        <div class="contact">
          <p class="title mouse-sm">
            email
          </p>
          <a href="mailto:picunada.dev@gmail.com" target="_blank">
            <p class="value mouse-sm">
              picunada.dev@gmail.com
            </p>
          </a>
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

  @media only screen and (max-width: 678px) {
    font-size: 1.2rem;
  }
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

  @media only screen and (max-width: 678px) {
    font-size: 1rem;
  }
}

.experience {
  font-size: 1rem;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 8px;

  @media only screen and (max-width: 678px) {
    font-size: 0.8rem;
  }
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
  grid-column: 1/3;
  grid-row: 5;
}

.item-6 {
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

    @media only screen and (max-width: 678px) {
      grid-template-columns: auto;
    }
  }

  .project-card {
    max-width: 100%;
    min-height: 400px;
    //border: solid 1px $primary;
    //border-radius: 16px;
    font-size: 2rem;
    font-weight: 800;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
}

.contacts-wrapper {
  margin-bottom: 120px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.contact {
  font-size: 1.2rem;
  font-weight: 600;
  display: flex;
  gap: 16px;

  @media only screen and (max-width: 678px) {
    font-size: 0.9rem;
  }

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

.section-header {
  margin-top: 80px;
  font-size: 1.4rem;
  color: var(--secondary);
}
</style>
