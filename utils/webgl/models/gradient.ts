import * as THREE from 'three'
import vertex from '../shader/gradient/vertex.glsl?raw'
import fragment from '../shader/gradient/fragment.glsl?raw'

export default class Gradient {
  private time = 0
  private material: THREE.ShaderMaterial
  private geometry: THREE.PlaneGeometry
  public mesh: THREE.Mesh

  constructor() {
    const palette = [
      new THREE.Color('#08aa7a'),
      new THREE.Color('#1c5a34'),
      new THREE.Color('#71feb8'),
      new THREE.Color('#262626'),
    ]

    this.material = new THREE.ShaderMaterial({
      side: THREE.DoubleSide,
      uniforms: {
        time: { value: 0 },
        uColor: { value: palette },
      },
      // wireframe: true,
      vertexShader: vertex,
      fragmentShader: fragment,
    })

    this.geometry = new THREE.PlaneGeometry(1, 1, 50, 50)

    this.mesh = new THREE.Mesh(this.geometry, this.material)
  }

  public animate() {
    this.time += 0.05
    this.material.uniforms.time.value = this.time
  }
}
