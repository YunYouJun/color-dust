<template>
  <div class="chart-container mt-5">
    <v-text-field
      v-model="top"
      :label="$t('home.pie.top')"
      type="number"
      outlined
      dense
      min="0"
    ></v-text-field>
    <canvas id="pie-chart"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js'
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
      config: {
        type: 'pie',
        options: {
          responsive: true,
        },
        data: {
          labels: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
          ],
          datasets: [
            {
              label: 'GitHub Commits',
              backgroundColor: '#f87979',
              data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11],
            },
            {
              label: 'GitHub Commits',
              backgroundColor: '#000000',
              data: [0, 10, 12, 39, 10, 40, 39, 80, 40, 20, 12, 101],
            },
          ],
        },
      },
    }
  },
  watch: {
    colors() {
      this.drawPieChart()
    },
    top() {
      if (this.top && this.colors.length > 1) {
        this.filterData()
        this.pieChart.update(this.config)
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.drawPieChart()
    })
  },
  methods: {
    filterData() {
      this.config.data = { labels: [], datasets: [] }
      const topColors = this.colors.slice(0, this.top)
      let otherColorsCount = this.$store.state.colors.total
      if (topColors.length > 0) {
        this.config.data.datasets.push({
          label: 'Colors',
          backgroundColor: [],
          data: [],
        })
        topColors.forEach((color) => {
          otherColorsCount -= color.count
          this.config.data.labels.push(color.hex)
          this.config.data.datasets[0].backgroundColor.push(color.hex)
          this.config.data.datasets[0].data.push(color.count)
        })
      }

      this.config.data.labels.push('Other Colors')
      this.config.data.datasets[0].backgroundColor.push('#999999')
      this.config.data.datasets[0].data.push(otherColorsCount)
    },
    drawPieChart() {
      this.filterData()
      const canvas = document.getElementById('pie-chart')
      const ctx = canvas.getContext('2d')
      this.pieChart = new Chart(ctx, this.config)
    },
  },
}
</script>
