<template>
  <div class="text-center">
    <v-card class="img-canvas-container">
      <canvas ref="demo" height="300"></canvas>
    </v-card>
    <div id="inset"></div>
    <div id="container"></div>
  </div>
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'stats.js'
import { readImage, drawToCanvas } from '~/assets/utils/index'
export default {
  data() {
    return {
      camera: null,
      scene: null,
      renderer: null,
      points: null,
      stats: null,
      controls: null,

      group: null,

      displayStats: false,

      colors: [],
      positions: [],

      scale: 3,
      height: 800,
      width: 1200,

      rangeOfColor: 256,

      // 小坐标轴
      inset: {
        camera: null,
        scene: null,
        renderer: null,
      },
    }
  },
  head() {
    return {
      title: this.$t('links.cube'),
    }
  },
  computed: {
    radius() {
      return (this.rangeOfColor * this.scale) / 2
    },
  },
  async mounted() {
    const url = '/color-dust/images/chen.jpg'
    const image = await readImage(url)
    await drawToCanvas(image, this.$refs.demo)
    this.getImageData()

    this.init()
    this.animate()
  },
  methods: {
    getImageData() {
      const canvas = this.$refs.demo
      const ctx = canvas.getContext('2d')
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)

      const data = imageData.data
      const color = new THREE.Color()

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i]
        const g = data[i + 1]
        const b = data[i + 2]
        this.positions.push(
          r * this.scale - this.radius,
          g * this.scale - this.radius,
          b * this.scale - this.radius
        )
        color.setRGB(r / 255, g / 255, b / 255)
        this.colors.push(color.r, color.g, color.b)
      }
    },
    generateVirtualData() {
      this.colors = []
      this.positions = []

      const particles = 5000
      const color = new THREE.Color()

      // size of cube
      const n = this.rangeOfColor * this.scale
      // spread from center, particles spread in the cube
      const r = n / 2

      for (let i = 0; i < particles; i++) {
        // positions
        const x = Math.random() * n - r
        const y = Math.random() * n - r
        const z = Math.random() * n - r

        this.positions.push(x, y, z)

        // colors
        const vx = x / n + 0.5
        const vy = y / n + 0.5
        const vz = z / n + 0.5

        color.setRGB(vx, vy, vz)
        this.colors.push(color.r, color.g, color.b)
      }
    },

    animate() {
      requestAnimationFrame(this.animate)
      this.controls.update()
      this.render()

      if (this.displayStats) {
        this.stats.update()
      }
    },

    initStats() {
      const container = document.getElementById('container')
      this.stats = new Stats()
      container.appendChild(this.stats.dom)
    },

    /**
     * init grid
     */
    initGrid() {
      const gridXZ = new THREE.GridHelper(2000, 10)
      gridXZ.position.y = gridXZ.position.set(0, 0, 0)
      gridXZ.material.linewidth = 10
      this.scene.add(gridXZ)
    },

    // box
    initBox() {
      const r = this.rangeOfColor * this.scale
      const helper = new THREE.BoxHelper(
        new THREE.Mesh(new THREE.BoxBufferGeometry(r, r, r))
      )
      helper.material.color.setHex(0x101010)
      helper.material.blending = THREE.AdditiveBlending
      helper.material.transparent = true
      helper.material.opacity = 0.8
      this.group.add(helper)
    },

    initAxes() {
      const insetWidth = 150
      const insetHeight = 150

      const container = document.getElementById('inset')
      container.width = insetWidth
      container.height = insetHeight

      // renderer
      this.inset.renderer = new THREE.WebGLRenderer({ alpha: true })
      const renderer = this.inset.renderer
      renderer.setClearColor(0x000000, 0)
      renderer.setSize(insetWidth, insetHeight)
      container.appendChild(renderer.domElement)

      this.inset.scene = new THREE.Scene()

      // camera
      this.inset.camera = new THREE.PerspectiveCamera(
        50,
        insetWidth / insetHeight,
        1,
        1000
      )
      this.inset.camera.up = this.camera.up // important!
      // add axes
      const axes = new THREE.AxesHelper(100)
      this.inset.scene.add(axes)
    },

    init() {
      const container = document.getElementById('container')

      // init camera
      this.camera = new THREE.PerspectiveCamera(
        27,
        this.width / this.height,
        5,
        10000
      )
      this.camera.position.z = 2750

      this.scene = new THREE.Scene()
      this.group = new THREE.Group()
      this.scene.add(this.group)

      // this.initGrid()

      const geometry = new THREE.BufferGeometry()

      geometry.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(this.positions, 3)
      )

      geometry.setAttribute(
        'color',
        new THREE.Float32BufferAttribute(this.colors, 3)
      )

      geometry.computeBoundingSphere()

      const material = new THREE.PointsMaterial({
        size: 15,
        vertexColors: true,
      })

      this.points = new THREE.Points(geometry, material)
      this.scene.add(this.points)

      //
      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      this.renderer.setPixelRatio(window.devicePixelRatio)
      this.renderer.setSize(this.width, this.height)

      container.appendChild(this.renderer.domElement)

      // init control
      this.controls = new OrbitControls(this.camera, this.renderer.domElement)
      this.controls.enableZoom = true
      // this.controls.autoRotate = true

      this.initBox()
      this.initAxes()

      // 渲染状态
      if (this.displayStats) {
        this.initStats()
      }

      window.addEventListener('resize', this.onWindowResize, false)
    },

    onWindowResize() {
      const camera = this.camera
      const renderer = this.renderer
      camera.aspect = this.width / this.height
      camera.updateProjectionMatrix()

      renderer.setSize(this.width, this.height)
    },

    render() {
      const camera = this.camera
      const renderer = this.renderer
      renderer.render(this.scene, camera)

      this.inset.camera.position.copy(camera.position)
      this.inset.camera.position.sub(this.controls.target)
      this.inset.camera.position.setLength(300)
      this.inset.camera.lookAt(this.inset.scene.position)
      this.inset.renderer.render(this.inset.scene, this.inset.camera)
    },
  },
}
</script>

<style>
#inset {
  width: 150px;
  height: 150px;
  background-color: transparent; /* or transparent; will show through only if renderer alpha: true */
  border: 1px solid black; /* or none; */
  margin: 0;
  padding: 0px;
  position: absolute;
  left: 20px;
  bottom: 20px;
  z-index: 100;
}
</style>
