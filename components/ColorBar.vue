<template>
  <div class="color-bar">
    <v-alert border="left" :color="colors[0]" colored-border elevation="2">
      <h3 class="title">
        <span class="label text-capitalize">{{ label }}</span>
        <span class="value font-weight-light text-uppercase ml-2">
          <span v-for="(color, i) in colors" :key="i">
            <i class="color-box" :style="{ backgroundColor: color }"></i>
            <span>{{ color }}</span>
          </span>
        </span>
        <v-divider class="mb-2"></v-divider>
      </h3>
      <div class="color-wrap">
        <v-card height="80" :style="background" ripple></v-card>
      </div>
    </v-alert>
  </div>
</template>

<script>
import { rgbToHex } from '~/packages/color-dust/utils'
export default {
  props: {
    label: { type: String, default: 'Color' },
    colors: {
      type: Array,
      default() {
        return []
      },
    },
  },
  computed: {
    background() {
      if (this.colors.length > 1) {
        let linearGradient = 'linear-gradient(to right'
        this.colors.forEach((color) => {
          linearGradient += ',' + color
        })
        linearGradient += ')'
        return {
          background: linearGradient,
        }
      } else {
        return {
          background: this.colors[0],
        }
      }
    },
  },
  methods: {
    rgbToHex,
  },
}
</script>

<style lang="scss">
.color-box {
  display: inline-block;
  width: 1rem;
  height: 1rem;
  border-radius: 2px;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  margin-left: 5px;
  margin-right: 2px;
}

.color-bar {
  .color-wrap {
    .color {
      height: 80px;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
    }
  }
}
</style>
