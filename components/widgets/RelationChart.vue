<template>
  <div id="disjoint-force-container"></div>
</template>

<script>
import * as d3 from 'd3'
export default {
  data() {
    return {
      links: [],
      nodes: [],
    }
  },
  watch: {
    '$store.state.colorsInfo'() {
      d3.select('#disjoint-force-container').selectAll('svg').remove()
      this.filterData()
      this.drawRelationChart()
    },
  },
  mounted() {},
  methods: {
    filterData() {
      const colorsInfo = this.$store.state.colorsInfo.slice(0, 300)
      colorsInfo.forEach((colorInfo) => {
        this.links.push({
          source: colorInfo.category,
          target: colorInfo.key,
        })
        this.nodes.push({
          id: colorInfo.key,
          hex: colorInfo.color.toHexString(),
        })
      })

      // 初始聚类点
      const initSeed = this.$store.state.colors.initSeed
      initSeed.forEach((seed) => {
        this.nodes.push({
          id: seed.category,
          hex: seed.color.toHexString(),
        })
      })
    },
    drawRelationChart() {
      const width = 800
      const height = 600

      const links = this.links
      const nodes = this.nodes

      const drag = (simulation) => {
        function dragstarted(event, d) {
          if (!event.active) simulation.alphaTarget(0.3).restart()
          d.fx = d.x
          d.fy = d.y
        }

        function dragged(event, d) {
          d.fx = event.x
          d.fy = event.y
        }

        function dragended(event, d) {
          if (!event.active) simulation.alphaTarget(0)
          d.fx = null
          d.fy = null
        }

        return d3
          .drag()
          .on('start', dragstarted)
          .on('drag', dragged)
          .on('end', dragended)
      }

      const simulation = d3
        .forceSimulation(nodes)
        .force(
          'link',
          d3.forceLink(links).id((d) => d.id)
        )
        .force('charge', d3.forceManyBody())
        .force('x', d3.forceX())
        .force('y', d3.forceY())

      const svg = d3
        .select('#disjoint-force-container')
        .append('svg')
        .attr('viewBox', [-width / 2, -height / 2, width, height])

      const link = svg
        .append('g')
        .attr('stroke', '#999')
        .attr('stroke-opacity', 0.6)
        .selectAll('line')
        .data(links)
        .join('line')
        .attr('stroke-width', 2)

      const node = svg
        .append('g')
        .attr('stroke', '#fff')
        .attr('stroke-width', 1.5)
        .selectAll('circle')
        .data(nodes)
        .join('circle')
        .attr('r', 5)
        .attr('fill', (d) => d.hex)
        .call(drag(simulation))

      node.append('title').text((d) => d.hex)

      simulation.on('tick', () => {
        link
          .attr('x1', (d) => d.source.x)
          .attr('y1', (d) => d.source.y)
          .attr('x2', (d) => d.target.x)
          .attr('y2', (d) => d.target.y)

        node.attr('cx', (d) => d.x).attr('cy', (d) => d.y)
      })
    },
  },
}
</script>
