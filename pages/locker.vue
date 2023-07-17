<script setup lang="ts">
import { useMediaQuery } from '@vueuse/core'

const { $gsap, $lenis, $router } = useNuxtApp()

const isMobile = useMediaQuery('(max-width: 678px)')

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
        if (isMobile) {
          $gsap.to('.arrow', {
            opacity: 1,
          })
        }
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

  <svg v-if="!isMobile" class="arrow" width="38" height="156" viewBox="0 0 38 156" fill="none"
    xmlns="http://www.w3.org/2000/svg">
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
        <div class="role--item mouse-sm">
          <h5 class="item--title">
            Tools
          </h5>
          <div class="tools">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
              <path fill="currentColor"
                d="M7.508 0c-.287 0-.573 0-.86.002c-.241.002-.483.003-.724.01c-.132.003-.263.009-.395.015A9.154 9.154 0 0 0 4.348.15A5.492 5.492 0 0 0 2.85.645A5.04 5.04 0 0 0 .645 2.848c-.245.48-.4.972-.495 1.5c-.093.52-.122 1.05-.136 1.576a35.2 35.2 0 0 0-.012.724C0 6.935 0 7.221 0 7.508v8.984c0 .287 0 .575.002.862c.002.24.005.481.012.722c.014.526.043 1.057.136 1.576c.095.528.25 1.02.495 1.5a5.03 5.03 0 0 0 2.205 2.203c.48.244.97.4 1.498.495c.52.093 1.05.124 1.576.138c.241.007.483.009.724.01c.287.002.573.002.86.002h8.984c.287 0 .573 0 .86-.002c.241-.001.483-.003.724-.01a10.523 10.523 0 0 0 1.578-.138a5.322 5.322 0 0 0 1.498-.495a5.035 5.035 0 0 0 2.203-2.203c.245-.48.4-.972.495-1.5c.093-.52.124-1.05.138-1.576c.007-.241.009-.481.01-.722c.002-.287.002-.575.002-.862V7.508c0-.287 0-.573-.002-.86a33.662 33.662 0 0 0-.01-.724a10.5 10.5 0 0 0-.138-1.576a5.328 5.328 0 0 0-.495-1.5A5.039 5.039 0 0 0 21.152.645A5.32 5.32 0 0 0 19.654.15a10.493 10.493 0 0 0-1.578-.138a34.98 34.98 0 0 0-.722-.01C17.067 0 16.779 0 16.492 0H7.508zm6.035 3.41c4.114 2.47 6.545 7.162 5.549 11.131c-.024.093-.05.181-.076.272l.002.001c2.062 2.538 1.5 5.258 1.236 4.745c-1.072-2.086-3.066-1.568-4.088-1.043a6.803 6.803 0 0 1-.281.158l-.02.012l-.002.002c-2.115 1.123-4.957 1.205-7.812-.022a12.568 12.568 0 0 1-5.64-4.838c.649.48 1.35.902 2.097 1.252c3.019 1.414 6.051 1.311 8.197-.002C9.651 12.73 7.101 9.67 5.146 7.191a10.628 10.628 0 0 1-1.005-1.384c2.34 2.142 6.038 4.83 7.365 5.576C8.69 8.408 6.208 4.743 6.324 4.86c4.436 4.47 8.528 6.996 8.528 6.996c.154.085.27.154.36.213c.085-.215.16-.437.224-.668c.708-2.588-.09-5.548-1.893-7.992z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
              <path fill="currentColor"
                d="m20 18.69l-7.3 4.05c-.5.26-1 .26-1.5 0L4 18.69L17.05 5.54l.35-.1c.3 0 .47.13.5.4L20 18.69M9.35 5.74L4.8 13.29L6.7 1.34c.03-.27.2-.4.5-.4c.2 0 .33.06.4.25l2.15 3.95l-.4.6M13.85 7L4.3 16.59l7.25-12.3c.1-.2.25-.29.45-.29s.33.09.4.29L13.85 7Z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 26 26">
              <g fill="none">
                <defs>
                  <mask id="pepiconsPopBluetoothCircleFilled0">
                    <path fill="#fff" d="M0 0h26v26H0z" />
                    <g fill="#000">
                      <path fill-rule="evenodd"
                        d="m14.535 13.795l5.572-4.25a1 1 0 0 0 0-1.59l-5.572-4.25a1 1 0 0 0-1.606.795V13a1 1 0 0 0 1.606.795Zm.394-7.274L17.85 8.75l-2.922 2.23V6.52Z"
                        clip-rule="evenodd" />
                      <path fill-rule="evenodd"
                        d="m14.535 22.295l5.572-4.25a1 1 0 0 0 0-1.59l-5.572-4.25A1 1 0 0 0 12.93 13v8.5a1 1 0 0 0 1.606.795Zm.394-7.274l2.922 2.229l-2.922 2.23v-4.46Z"
                        clip-rule="evenodd" />
                      <path d="M14.526 12.198a1 1 0 1 1-1.195 1.604L6.366 8.607a1 1 0 1 1 1.196-1.603l6.964 5.194Z" />
                      <path d="M14.526 13.802a1 1 0 1 0-1.195-1.604l-6.965 5.195a1 1 0 0 0 1.196 1.603l6.964-5.194Z" />
                    </g>
                  </mask>
                </defs>
                <circle cx="13" cy="13" r="13" fill="currentColor" mask="url(#pepiconsPopBluetoothCircleFilled0)" />
              </g>
            </svg>
          </div>
        </div>
      </div>
      <RevealOnScroll>
        <div class="project-description">
          <p class="mouse-sm">
            Locker is a comprehensive mobile application designed to simplify package tracking and management of your home
            mail terminal. Developed over a period of 5 months, this project allowed me to gain valuable experience
            working with a range of technologies, including Swift UI, Combine, Bluetooth Low Energy (BLE), Firebase, and
            asynchronous messaging.
          </p>
          <p class="mouse-sm">
            Key Features:
          </p>
          <p class="mouse-sm">
            Package Tracking: Locker provides a user-friendly interface to track deliveries in real-time. Users can easily
            input tracking numbers and receive notifications for package updates.
          </p>

          <p class="mouse-sm">
            Home Mail Terminal Management: The app allows users to manage their home mail terminal efficiently. They can
            organize mail items, mark them as read/unread, and create custom filters for better organization.
          </p>

          <p class="mouse-sm">
            Swift UI: The app's user interface is built using Swift UI, a powerful framework that enables developers to
            create dynamic, responsive, and visually appealing interfaces.
          </p>

          <p class="mouse-sm">
            Combine: Locker leverages Combine, a framework introduced by Apple, for reactive programming. Combine
            simplifies handling asynchronous events, such as network requests and data updates, making the app more
            efficient and responsive.
          </p>

          <p class="mouse-sm">
            Bluetooth Low Energy (BLE): The app integrates Bluetooth BLE technology, enabling users to connect with
            compatible smart lockers for secure delivery management and retrieval.
          </p>
          <p class="mouse-sm">
            Firebase Integration: Locker utilizes Firebase, a powerful platform provided by Google, for seamless backend
            integration. Firebase facilitates real-time data synchronization, secure user authentication, and efficient
            cloud storage.
          </p>
          <p class="mouse-sm">
            Asynchronous Messaging: The app incorporates asynchronous messaging to enhance communication between users and
            customer support. Users can send and receive messages to resolve any delivery-related issues or inquiries.
          </p>
          <p class="mouse-sm">
            By developing Locker and working with these technologies, I honed my skills in app development, UI design,
            backend integration, and asynchronous communication. The project allowed me to gain practical experience in
            managing complex workflows, integrating various frameworks, and delivering a user-friendly and efficient
            product.
          </p>
          <p class="mouse-sm">
            Overall, Locker showcases my ability to create innovative and practical solutions for real-world problems,
            highlighting my expertise in Swift UI, Combine, Bluetooth BLE, Firebase, and asynchronous messaging.
          </p>
        </div>
      </RevealOnScroll>
    </div>
  </div>
</template>
