<template>
  <div class="color-bar">
    <v-alert border="left" colored-border elevation="2">
      <h3 class="title">
        <span class="label text-capitalize">{{ label }}</span>
        <span class="value font-weight-light text-uppercase ml-2">
          <span>
            <i class="color-box" :style="{ backgroundColor: colorStart }"></i>
            <span>{{ colorStart }}</span>
          </span>
          <span :style="{ color: colorMiddle }"
            ><i class="color-box" :style="{ backgroundColor: colorMiddle }"></i
            ><span>{{ colorMiddle }}</span>
          </span>
          <span :style="{ color: colorEnd }">
            <i class="color-box" :style="{ backgroundColor: colorEnd }"></i>
            <span>{{ colorEnd }}</span>
          </span>
        </span>
        <v-divider class="mb-2"></v-divider>
      </h3>
      <div class="color-wrap">
        <v-card height="80" :style="gradient" ripple></v-card>
      </div>
    </v-alert>
  </div>
</template>

<script>
export default {
  props: {
    label: { type: String, default: 'Color' },
    colorStart: { type: String, default: '#999999' },
    colorMiddle: { type: String, default: '#666666' },
    colorEnd: { type: String, default: '#333333' },
  },
  computed: {
    gradient() {
      return {
        background:
          'linear-gradient(to right,' +
          this.colorStart +
          ',' +
          this.colorMiddle +
          ',' +
          this.colorEnd +
          ')',
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
