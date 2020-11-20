<template>
  <v-row>
    <v-col cols="1">
      <v-checkbox v-model="displayBarChart" title="Display Bar Chart">
        <template #label>
          <v-icon>$vuetify.icons.mdiChartBar</v-icon>
        </template>
      </v-checkbox>
    </v-col>

    <v-col cols="1">
      <v-checkbox v-model="displayPieChart" title="Display Pie Chart">
        <template #label>
          <v-icon>$vuetify.icons.mdiChartPie</v-icon>
        </template>
      </v-checkbox>
    </v-col>

    <v-col cols="1">
      <v-checkbox v-model="displayRelationChart" title="Display Relation Chart">
        <template #label>
          <v-icon>$vuetify.icons.mdiRelationManyToMany</v-icon>
        </template>
      </v-checkbox>
    </v-col>

    <v-col cols="1">
      <v-checkbox v-model="displayWordCloud" title="Display Word Cloud">
        <template #label>
          <v-icon>$vuetify.icons.mdiCloud</v-icon>
        </template>
      </v-checkbox>
    </v-col>

    <v-col cols="1">
      <v-checkbox v-model="displayBubbleChart" title="Display Bubble Chart">
        <template #label>
          <v-icon>$vuetify.icons.mdiChartBubble</v-icon>
        </template>
      </v-checkbox>
    </v-col>
  </v-row>
</template>

<script>
export default {
  computed: {
    displayBarChart: {
      get() {
        return this.$store.state.control.display.barChart
      },
      set(val) {
        this.$store.commit('control/setDisplayChart', {
          type: 'barChart',
          display: val,
        })
      },
    },
    displayPieChart: {
      get() {
        return this.$store.state.control.display.pieChart
      },
      set(val) {
        this.$store.commit('control/setDisplayChart', {
          type: 'pieChart',
          display: val,
        })
      },
    },
    displayRelationChart: {
      get() {
        return this.$store.state.control.display.relationChart
      },
      set(val) {
        this.$store.commit('control/setDisplayChart', {
          type: 'relationChart',
          display: val,
        })
      },
    },
    displayWordCloud: {
      get() {
        return this.$store.state.control.display.wordCloud
      },
      set(val) {
        this.$store.commit('control/setDisplayChart', {
          type: 'wordCloud',
          display: val,
        })
      },
    },
    displayBubbleChart: {
      get() {
        return this.$store.state.control.display.bubbleChart
      },
      set(val) {
        this.$store.commit('control/setDisplayChart', {
          type: 'bubbleChart',
          display: val,
        })
      },
    },
  },
}
</script>
