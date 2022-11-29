import 'phaser'
import './style.css'

const [w, h] = [document.body.clientWidth, document.body.offsetHeight]

console.log({ w, h })

class Demo extends Phaser.Scene {
  preload() {
    this.load.setBaseURL('http://labs.phaser.io')

    this.load.image('sky', 'assets/skies/space3.png')
    this.load.image('logo', 'assets/sprites/phaser3-logo.png')
    this.load.image('red', 'assets/particles/red.png')
  }

  create() {
    this.add.tileSprite(w / 2, h / 2, w, h, 'sky')

    const particles = this.add.particles('red')

    const emitter = particles.createEmitter({
      speed: 100,
      scale: { start: 1, end: 0 },
      blendMode: 'ADD',
    })

    const logo = this.physics.add.image(400, 100, 'logo')

    logo.setVelocity(400, 100)
    logo.setBounce(1, 1)
    logo.setCollideWorldBounds(true)

    emitter.startFollow(logo)
  }
}

new Phaser.Game({
  type: Phaser.AUTO,
  width: w,
  height: h,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 },
    },
  },
  scene: Demo,
})
