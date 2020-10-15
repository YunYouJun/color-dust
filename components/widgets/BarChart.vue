<template>
  <div class="mt-4">
    <v-text-field
      v-model="top"
      :label="$t('home.pie.top')"
      type="number"
      outlined
      dense
      min="0"
      hide-details
      @input="reDraw"
    ></v-text-field>
    <div id="bar-chart-container"></div>
  </div>
</template>

<script>
import * as d3 from 'd3'
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
      top: 20,
    }
  },
  watch: {
    colors(val, oldVal) {
      if (val.length === 0 && oldVal.length === 0) return

      if (!this.barChart) {
        this.barChart = this.drawBarChart(val.slice(0, this.top))
      } else if (val.length !== 0) {
        this.reDraw()
      }
    },
  },
  methods: {
    reDraw() {
      d3.select('#bar-chart-container').selectAll('svg').remove()
      this.barChart = this.drawBarChart(this.colors.slice(0, this.top))
    },
    drawBarChart(barChartData) {
      const barHeight = 25
      const margin = {
        top: 16,
        // display 16 hex color
        left: 72,
        bottom: 0,
        right: 0,
      }
      const width = document.getElementById('bar-chart-container').clientWidth
      const height = margin.top + barHeight * barChartData.length

      const svg = d3
        .select('#bar-chart-container')
        .append('svg')
        .attr('id', 'bar-chart')
        .attr('viewBox', `0 0 ${width} ${height}`)
        .attr('width', width)
        .attr('height', height)
        .append('g')

      const xMax = d3.max(barChartData, (d) => d.count)
      const xScale = d3
        .scaleLinear()
        .domain([0, xMax])
        .rangeRound([margin.left, width - margin.right - margin.left - 60])

      const yScale = d3
        .scaleBand()
        .domain(barChartData.map((d) => d.hex))
        .rangeRound([margin.top, height])

      // 颜色条
      svg
        .append('g')
        .style('fill', 'dodgerblue')
        .join('g')
        .selectAll('rect')
        .data(barChartData)
        .join('rect')
        .style('mix-blend-mode', 'multiply')
        .attr('fill', (d) => d.hex)
        .attr('x', xScale(0))
        .attr('y', (d) => yScale(d.hex))
        .attr('width', (d) => xScale(d.count))
        .attr('height', barHeight)

      // 色彩数量文本
      svg
        .selectAll('text')
        .data(barChartData)
        .enter()
        .append('text')
        .text((d) => d.count)
        .attr('x', (d) => xScale(d.count) + margin.left + 5)
        .attr('y', (d) => yScale(d.hex) + 19)
        .attr('text-anchor', 'start')
        .attr('font-family', 'Source Code Pro')
        .attr('fill', this.$vuetify.theme.dark ? 'white' : 'black')

      const yAxis = (g, y) =>
        g
          .attr('transform', `translate(${margin.left},0)`)
          .call(d3.axisLeft(y).tickSizeOuter(0))

      const gy = svg.append('g').call(yAxis, yScale)
      gy.selectAll('text')
        .attr('font-size', '0.9rem')
        .attr('font-family', 'Source Code Pro')

      return svg.node()
    },
  },
}
</script>

<style>
.tick {
  text-transform: uppercase;
}
</style>
