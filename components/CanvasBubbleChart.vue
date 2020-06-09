<template>
  <div class="bubble-chart">
    <v-alert border="left" colored-border elevation="2">
      <h2 class="headline font-weight-light ml-2">
        More Colors In Bubble Chart
      </h2>
      <v-divider class="my-2"></v-divider>
      <v-card class="text-center" :elevation="0">
        <canvas
          id="bubble-chart"
          ref="bubbleChart"
          @click="handleCanvasClick"
        ></canvas>
        <v-card-actions class="justify-center">
          <v-chip color="success" class="text-uppercase" @click="copyColorHex">
            <v-icon left>$vuetify.icons.mdiEyedropper</v-icon>
            <span ref="selectColor">{{ selectColor }}</span>
          </v-chip>
        </v-card-actions>
      </v-card>
    </v-alert>
  </div>
</template>

<style scoped>
#bubble-chart {
  width: 100%;
  max-width: 600px;
  height: 400px;
}
</style>

<script>
import { hslToRgb, rgbToHex } from '~/packages/color-dust/utils'
export default {
  props: {
    colors: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {
      selectColor: '#',
      bubbles: [],
    }
  },
  watch: {
    colors() {
      if (this.colors.length > 0) {
        const bubbles = this.processColors(this.colors)
        this.renderBubble(bubbles)
      } else {
        const canvas = this.$refs.bubbleChart
        this.ctx.clearRect(0, 0, canvas.width, canvas.height)
      }
    },
  },
  mounted() {
    const canvas = this.$refs.bubbleChart
    const pixelRatio = window.devicePixelRatio || 1
    this.pixelRatio = pixelRatio
    canvas.width = pixelRatio * parseInt(getComputedStyle(canvas).width)
    canvas.height = pixelRatio * parseInt(getComputedStyle(canvas).height)
    this.oriWidth = canvas.width
    this.oriHeight = canvas.height
    this.ctx = canvas.getContext('2d')
    this.circleR = Math.min(
      canvas.width / 2 - 15 * pixelRatio,
      canvas.height / 2 - 15 * pixelRatio
    )
    this.iterations = 2
    this.time = 400
    this.density = 0.1
    this.initBubbles(this.createDataset())
    this.renderBubble(this.bubbles)
  },
  methods: {
    copyColorHex() {
      if (this.$refs.selectColor) {
        const hex = this.$refs.selectColor.textContent
        navigator.clipboard.writeText(hex.toUpperCase())
        this.$toast.success(
          `Copy &nbsp;<strong style="color:${this.selectColor};">${this.selectColor}</strong>&nbsp; successfully!`
        )
      }
    },
    initBubbles(bubbles) {
      const pixelRatio = this.pixelRatio
      const canvas = this.$refs.bubbleChart
      const w = canvas.width
      const h = canvas.height
      const radius = this.circleR

      // compute scale factor K for radius
      const maxWeight = Math.log2(bubbles[0].weight)
      const K = radius * this.density
      this.K = K
      // compute radius again and init object's dataset
      this.bubbles = bubbles.map((ele) => {
        // init center for bubble
        let centerX = w / 2 - radius + Math.random() * 2 * radius
        let centerY = h / 2 - radius + Math.random() * 2 * radius
        const distance = Math.sqrt(
          (w / 2 - centerX) ** 2 + (h / 2 - centerY) ** 2
        )
        let r = K * (Math.log(ele.weight) / maxWeight)
        r = r < 1.5 * pixelRatio ? 1.5 * pixelRatio : r // r >= 3
        r = r > K ? K : r
        if (distance > radius - r) {
          // move center into circle
          centerX += ((w / 2 - centerX) * (distance - radius + r)) / distance
          centerY += ((h / 2 - centerY) * (distance - radius + r)) / distance
        }
        return {
          weight: ele.weight,
          color: ele.color,
          radius: r,
          x: centerX,
          y: centerY,
        }
      })

      this.maxRadius = radius * this.density
      this.computePosition()
    },
    handleCanvasClick(e) {
      const canvas = this.$refs.bubbleChart
      const loc = this.windowTocanvas(canvas, e.clientX, e.clientY)
      const cx = canvas.width / 2
      const cy = canvas.height / 2
      const x = loc.x * this.pixelRatio
      const y = loc.y * this.pixelRatio
      let color = ''
      const clickInCircle =
        Math.sqrt((x - cx) * (x - cx) + (y - cy) * (y - cy)) < this.circleR
      const bubbles = this.bubbles
      let len = bubbles.length
      while (len--) {
        const bubble = bubbles[len]
        const dis = Math.sqrt(
          (x - bubble.x) * (x - bubble.x) + (y - bubble.y) * (y - bubble.y)
        )
        if (dis < bubble.radius) {
          color = bubble.color
          break
        }
      }
      if (clickInCircle) {
        if (color) {
          this.selectColor = color.toUpperCase()
        } else {
          this.selectColor = '#'
        }
      } else if (this.colors.length) {
        const bubbles = this.processColors(this.colors)
        this.renderBubble(bubbles)
      } else {
        this.initBubbles(this.createDataset())
        this.renderBubble(this.bubbles)
      }
    },
    processColors(colors) {
      const dataset = []
      const len = colors.length
      const cStep = len < 360 ? 1 : Math.ceil(len / 360)
      let color
      // console.log("maxWeight processColors",maxWeight)
      for (let i = 0; i < len; ) {
        color = colors[i]
        dataset.push({
          weight: color.fre,
          color: rgbToHex(hslToRgb(color.h, color.s, color.l)),
        })
        i += cStep
      }
      // console.log("bubbles: ", dataset.length)
      return dataset
    },
    renderBubble(bubbles) {
      if (bubbles && bubbles.length > 0) {
        this.initBubbles(bubbles)
      }
      // draw bubbles
      this.beginTime = +new Date()
      this.speed = this.maxRadius / this.time
      this.drawBubbles()
    },
    computePosition() {
      const iterations = this.iterations
      let iteration = 0
      const bubbles = this.bubbles
      const len = bubbles.length

      while (iteration < iterations) {
        iteration++
        let l1 = len
        while (l1--) {
          // duff's device save much time, but almost ineffective when two duff Nested
          this.traverseBubbles(bubbles[l1])
        }
      }
    },
    traverseBubbles(bubble1) {
      const bubbles = this.bubbles
      let len = bubbles.length
      let count = (len / 8) ^ 0
      let start = len % 8
      while (start--) {
        this.divideBubbles(bubble1, bubbles[start])
      }
      while (count--) {
        this.divideBubbles(bubble1, bubbles[--len])
        this.divideBubbles(bubble1, bubbles[--len])
        this.divideBubbles(bubble1, bubbles[--len])
        this.divideBubbles(bubble1, bubbles[--len])
        this.divideBubbles(bubble1, bubbles[--len])
        this.divideBubbles(bubble1, bubbles[--len])
        this.divideBubbles(bubble1, bubbles[--len])
        this.divideBubbles(bubble1, bubbles[--len])
      }
    },

    divideBubbles(bubble1, bubble2) {
      if (
        bubble1.color === bubble2.color &&
        bubble1.radius === bubble2.radius &&
        Math.abs(bubble1.x - bubble2.x) < 0.001
      ) {
        return
      }
      let diff = this.collisionCheck(bubble1, bubble2)
      if (diff > 0) {
        return
      }
      diff = Math.abs(diff)
      const cta = Math.atan(
        Math.abs(bubble1.y - bubble2.y) / Math.abs(bubble1.x - bubble2.x)
      )
      const xDiff = diff * Math.cos(cta) + 0.2
      const yDiff = diff * Math.sin(cta) + 0.2

      // pos analyze
      if (bubble2.x >= bubble1.x && bubble2.y >= bubble1.y) {
        // 4 quadrant
        bubble2.x += xDiff
        bubble2.y += yDiff
      } else if (bubble2.x <= bubble1.x && bubble2.y >= bubble1.y) {
        // 3 quadrant
        bubble2.x -= xDiff
        bubble2.y += yDiff
      } else if (bubble2.x <= bubble1.x && bubble2.y <= bubble1.y) {
        // 2 quadrant
        bubble2.x -= xDiff
        bubble2.y -= yDiff
      } else if (bubble2.x >= bubble1.x && bubble2.y <= bubble1.y) {
        // 1 quadrant
        bubble2.x += xDiff
        bubble2.y -= yDiff
      }
    },

    collisionCheck(bubble1, bubble2) {
      const x = Math.abs(bubble1.x - bubble2.x)
      const y = Math.abs(bubble1.y - bubble2.y)
      const r = bubble1.radius + bubble2.radius
      return Math.sqrt(x * x + y * y) - r
    },

    drawBubbles() {
      const now = +new Date()
      const scale = (now - this.beginTime) * this.speed
      const canvas = this.$refs.bubbleChart
      const ctx = this.ctx
      const bubbles = this.bubbles
      let len = bubbles.length
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      let count = (len / 8) ^ 0
      let start = len % 8
      while (start--) {
        this.drawBubble(bubbles[start], scale)
      }
      while (count--) {
        this.drawBubble(bubbles[--len], scale)
        this.drawBubble(bubbles[--len], scale)
        this.drawBubble(bubbles[--len], scale)
        this.drawBubble(bubbles[--len], scale)
        this.drawBubble(bubbles[--len], scale)
        this.drawBubble(bubbles[--len], scale)
        this.drawBubble(bubbles[--len], scale)
        this.drawBubble(bubbles[--len], scale)
      }

      if (now < this.beginTime + this.time) {
        window.requestAnimationFrame(this.drawBubbles)
      } else if (this.speed !== 0) {
        this.speed = 0
        window.requestAnimationFrame(this.drawBubbles)
      }
    },

    drawBubble(bubble, scale) {
      const ctx = this.ctx
      const radius = bubble.radius
      ctx.fillStyle = bubble.color
      ctx.beginPath()
      if (scale < radius && this.speed !== 0) {
        ctx.arc(bubble.x, bubble.y, scale, 0, 2 * Math.PI)
      } else {
        const damp = this.speed === 0 ? 0 : (scale - radius) / this.maxRadius
        const spring =
          2 * Math.exp(-8 * damp) * Math.sin(2 * 2 * Math.PI * damp)
        ctx.arc(bubble.x, bubble.y, radius + spring, 0, 2 * Math.PI)
      }
      ctx.fill()
    },

    windowTocanvas(canvas, x, y) {
      const bbox = canvas.getBoundingClientRect()
      return {
        x: x - bbox.left,
        y: y - bbox.top,
      }
    },

    createDataset() {
      const dataset = []
      dataset.push({
        weight: 100,
        color: '#666666',
      })
      for (let i = 0; i < 99; i++) {
        dataset.push({
          weight: Math.floor(Math.random() * 50),
          color:
            'rgb(' +
            Math.floor(Math.random() * 255) +
            ',' +
            Math.floor(Math.random() * 255) +
            ',' +
            Math.floor(Math.random() * 255) +
            ')',
          opacity: Math.random(),
        })
      }
      return dataset
    },
  },
}
</script>
