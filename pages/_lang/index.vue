<template>
  <v-row no-gutters>
    <v-col cols="12">
      <image-showcase></image-showcase>
    </v-col>
    <v-col cols="12">
      <color-list :colors="$store.state.clusterColors"></color-list>
    </v-col>
    <v-col cols="12">
      <color-bar
        :label="$t('color.main')"
        :colors="this.$store.state.mainColor"
      ></color-bar>
    </v-col>
    <v-col cols="12">
      <color-bar
        :label="$t('color.average')"
        :colors="[this.$store.state.averageColor]"
      ></color-bar>
    </v-col>
    <v-col cols="12">
      <image-info></image-info>
    </v-col>
    <v-col cols="12">
      <border-card :icons="barIcons">
        <bar-chart :colors="$store.state.colorsInfo"></bar-chart>
      </border-card>
    </v-col>
    <v-col cols="12">
      <border-card :icons="pieIcons">
        <pie-chart :colors="$store.state.colorsInfo"></pie-chart>
      </border-card>
    </v-col>
    <v-col cols="12">
      <border-card :icons="relationIcons">
        <relation-chart :colors="$store.state.colorsInfo"></relation-chart>
      </border-card>
    </v-col>
    <v-col cols="12">
      <word-cloud :colors="$store.state.colorsInfo"></word-cloud>
    </v-col>
    <v-col cols="12">
      <canvas-bubble-chart
        :colors="$store.state.colorsInfo"
      ></canvas-bubble-chart>
    </v-col>
  </v-row>
</template>

<script>
// components
import ImageShowcase from '~/components/ImageShowcase'
import ColorBar from '~/components/ColorBar'
import ImageInfo from '~/components/ImageInfo'
import ColorList from '~/components/colors/ColorList'
import BarChart from '~/components/widgets/BarChart'
import PieChart from '~/components/widgets/PieChart'
import RelationChart from '~/components/widgets/RelationChart'
import WordCloud from '~/components/widgets/WordCloud'
import CanvasBubbleChart from '~/components/CanvasBubbleChart'
import BorderCard from '~/components/common/BorderCard'
export default {
  components: {
    ImageShowcase,
    ColorBar,
    ColorList,
    ImageInfo,
    BarChart,
    PieChart,
    RelationChart,
    WordCloud,
    CanvasBubbleChart,
    BorderCard,
  },
  data() {
    return {
      barIcons: [
        {
          name: '$vuetify.icons.mdiPalette',
          color: 'indigo',
        },
        {
          name: '$vuetify.icons.mdiPlus',
        },
        {
          name: '$vuetify.icons.mdiChartBar',
          color: 'primary',
        },
      ],
      pieIcons: [
        {
          name: '$vuetify.icons.mdiPalette',
          color: 'indigo',
        },
        {
          name: '$vuetify.icons.mdiPlus',
        },
        {
          name: '$vuetify.icons.mdiChartPie',
          color: 'teal',
        },
      ],
      relationIcons: [
        {
          name: '$vuetify.icons.mdiPalette',
          color: 'indigo',
        },
        {
          name: '$vuetify.icons.mdiPlus',
        },
        {
          name: '$vuetify.icons.mdiRelationManyToMany',
          color: 'cyan',
        },
      ],
    }
  },
  head() {
    return {
      title: this.$t('links.home'),
    }
  },
}
</script>
