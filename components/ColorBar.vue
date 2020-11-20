<template>
  <div class="color-bar">
    <v-alert
      border="left"
      :color="leftBorderColor"
      colored-border
      elevation="2"
    >
      <h3 class="title">
        <span class="label text-capitalize">{{ label }}</span>
        <span class="value font-weight-light text-uppercase ml-2">
          <span v-for="(color, i) in colors" :key="i">
            <i class="color-box" :style="{ backgroundColor: color }"></i>
            <span>{{ color ? color.toHexString() : '' }}</span>
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
    leftBorderColor() {
      if (this.colors[0]) {
        return this.colors[0].toHexString()
      } else {
        return 'black'
      }
    },
    background() {
      if (this.colors.length > 1) {
        let linearGradient = 'linear-gradient(to right'
        this.colors.forEach((color) => {
          linearGradient += ',' + color.toHexString()
        })
        linearGradient += ')'
        return {
          background: linearGradient,
        }
      } else {
        return {
          background: this.colors[0] ? this.colors[0].toHexString() : '',
        }
      }
    },
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
