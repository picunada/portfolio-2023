import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import Time from './lib/time'
import Gradient from './models/gradient'

export default class Sketch {
  private canvas: HTMLCanvasElement
  private renderer: THREE.WebGLRenderer
  private composer: EffectComposer
  private scene: THREE.Scene
  private camera: THREE.PerspectiveCamera
  private controls: OrbitControls
  private time: Time = new Time()

  private gradient: Gradient

  public loaded: Ref<boolean> = useState('loaded', () => false)

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      powerPreference: 'low-power',
      antialias: false,
    })
    this.composer = new EffectComposer(this.renderer)
    this.composer.addPass(new RenderPass(this.scene, this.camera))

    this.gradient = new Gradient()
    this.scene.add(this.gradient.mesh)

    this.setupRenderer()
    this.setupCamera()

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)

    this.time.animate(() => this.animate())

    setTimeout(() => this.loaded.value = true, 2000)

    window.addEventListener('resize', () => this.resize())
  }

  private setupRenderer() {
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.toneMappingExposure = 0.6
  }

  private setupCamera() {
    this.camera.position.set(-0.07, 0.22, 0.3)
    this.camera.rotation.set(-0.6, 0.187, 0.139)
    // this.camera.lookAt(this.gradient.mesh.position)s
  }

  private resize() {
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.composer.setSize(window.innerWidth, window.innerHeight)

    this.renderer.pixelRatio = window.devicePixelRatio
    this.composer.setPixelRatio(window.devicePixelRatio)

    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
  }

  private animate() {
    this.composer.render()
    this.gradient.animate()
  }
}
