<template>
  <v-alert colored-border border="left" :elevation="2">
    <div id="bar-chart-container"></div>
  </v-alert>
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
  watch: {
    colors(val, oldVal) {
      if (val.length === 0 && oldVal.length === 0) return
      const data = Array.from(oldVal.slice(0, 19))

      if (oldVal.length !== 0) {
        this.barChart.update(data)
      }
    },
  },
  mounted() {
    this.barChart = this.drawBarChart(this.colors)
  },
  methods: {
    drawBarChart(barChartData) {
      const barHeight = 30
      const margin = {
        top: 0,
        left: 70,
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
        .attr('height', height)
        .append('g')

      const xMax = d3.max(barChartData, (d) => d.count)
      const xScale = d3
        .scaleLinear()
        .domain([0, xMax])
        .rangeRound([margin.left, width - margin.right])
      const yScale = d3
        .scaleBand()
        .domain(barChartData.map((d) => d.hex))
        .rangeRound([margin.top, height])
        .paddingInner(0.2)

      let bar = svg
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
        .attr('height', yScale.bandwidth() - 1)

      const yAxis = (g, y) =>
        g
          .attr('transform', `translate(${margin.left},0)`)
          .call(d3.axisLeft(y).tickSizeOuter(0))
      const gy = svg.append('g').call(yAxis, yScale)
      gy.selectAll('text')
        .attr('font-size', '0.9rem')
        .attr('font-family', 'Source Code Pro')

      return Object.assign(svg.node(), {
        update(data) {
          const t = svg.transition().duration(750)

          gy.transition(t).call(yAxis, yScale.domain(data.map((d) => d.hex)))

          bar = bar
            .data(data, (d) => d.hex)
            .join(
              (enter) =>
                enter
                  .append('rect')
                  .style('mix-blend-mode', 'multiply')
                  .attr('class', 'bar')
                  .attr('fill', (d) => d.hex)
                  .attr('x', xScale(0))
                  .attr('y', (d) => yScale(d.hex))
                  .attr('width', (d) => xScale(d.count))
                  .attr('height', yScale.bandwidth() - 1),
              (update) =>
                update
                  .attr('height', yScale.bandwidth() - 1)
                  .attr('fill', (d) => d.hex),
              (exit) =>
                exit.call((bar) =>
                  bar
                    .transition()
                    .duration(600)
                    .remove()
                    .attr('x', (d) => -xScale(d.count))
                    .style('opacity', 0)
                )
            )
            .call((bar) =>
              bar
                .transition(t)
                .attr('width', (d) => xScale(d.count))
                .attr('y', (d) => yScale(d.hex))
            )
        },
      })
    },
  },
}
</script>

<style>
.tick {
  text-transform: uppercase;
}
</style>
