<template>
  <v-alert
    id="wordcloud-container"
    border="left"
    colored-border
    color="brown"
    style="font-weight: bold;"
    elevation="2"
  ></v-alert>
</template>

<script>
import * as d3 from 'd3'
import cloud from 'd3-cloud'
export default {
  props: {
    colors: {
      type: Array,
      default() {
        return []
      },
    },
    height: {
      type: Number,
      default: 150,
    },
    callback: {
      type: Function,
      default(word) {
        navigator.clipboard.writeText(word)
        this.$toast.success(
          `Copy &nbsp;<strong style="color:${word};">${word}</strong>&nbsp; successfully!`
        )
      },
    },
  },
  data() {
    return {
      words: [],
    }
  },
  watch: {
    colors() {
      if (this.colors.length > 0) {
        this.words = this.processColors(this.colors)
        this.reDraw()
      }
    },
  },
  mounted() {
    if (this.colors.length > 0) {
      this.words = this.processColors(this.colors)
      this.reDraw()
    } else {
      this.reDraw()
    }
    window.onresize = () => {
      this.reDraw()
    }
  },
  methods: {
    processColors(colors) {
      const dataset = []
      const len = colors.length
      const cStep = len < 360 ? 1 : Math.ceil(len / 360)
      let color
      for (let i = 0; i < len; ) {
        color = colors[i]
        dataset.push({
          size: color.count,
          text: color.hex,
        })
        i += cStep
      }
      return dataset
    },
    reDraw() {
      d3.select('#wordcloud-container').selectAll('svg').remove()
      this.initWordCloud()
    },
    initWordCloud() {
      this.drawWordCloud()
      this.$nextTick(function () {
        document.querySelectorAll('.cloud-word').forEach((item) => {
          item.addEventListener('click', () => {
            this.callback(item.dataset.text)
          })
        })
      })
    },
    minMax(items) {
      return items.reduce((acc, val) => {
        acc[0] = acc[0] === undefined || val.size < acc[0] ? val.size : acc[0]
        acc[1] = acc[1] === undefined || val.size > acc[1] ? val.size : acc[1]
        return acc
      }, [])
    },
    drawWordCloud() {
      const width =
        document.getElementById('wordcloud-container').clientWidth - 50
      const height = this.height
      const svg = d3
        .select('#wordcloud-container')
        .append('svg')
        .attr('width', width)
        .attr('height', height)

      const minMax = this.minMax(this.words)

      const layout = cloud()
        .size([width, height])
        .words(
          this.words.map(function (d) {
            return {
              id: d.id,
              text: d.text,
              size: 10 + ((d.size - minMax[0]) * 50) / (minMax[1] - minMax[0]),
            }
          })
        )
        .padding(10)
        .rotate(function () {
          return 0
        })
        .fontSize(function (d) {
          return d.size
        })
        .on('end', draw)

      layout.start()

      function draw(words) {
        svg
          .append('g')
          .attr(
            'transform',
            `translate(${layout.size()[0] / 2},${layout.size()[1] / 2})`
          )
          .selectAll('text')
          .data(words)
          .enter()
          .append('a')
          .attr('class', 'cloud-word')
          .attr('data-text', (d) => {
            return d.text.toUpperCase()
          })
          .append('text')
          .attr('fill', (d) => d.text)
          .attr('font-family', 'Source Code Pro')
          .attr('font-size', function (d) {
            return `${d.size}px`
          })
          .attr('text-anchor', 'middle')
          .attr('transform', function (d) {
            return `translate(${[d.x, d.y]})rotate(${d.rotate})`
          })
          .text(function (d) {
            return d.text.toUpperCase()
          })
      }
    },
  },
}
</script>
