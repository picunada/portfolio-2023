import { Clock } from 'three'

export default class Time {
  private clock: Clock = new Clock()

  public animate(callback: (deltaTime: number) => void) {
    callback(this.clock.getDelta())

    requestAnimationFrame(() => this.animate(callback))
  }
}
