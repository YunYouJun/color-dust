<template>
  <v-card ripple hover :color="color" class="color-card" @click="copyColorHex">
    <v-card-title></v-card-title>
    <h4 class="pa-0 color-text text-uppercase subtitle-2">{{ color }}</h4>
  </v-card>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: '',
    },
  },
  methods: {
    copyColorHex() {
      const curColor = this.color.toUpperCase()
      navigator.clipboard.writeText(curColor)
      this.$toast.success(
        `Copy &nbsp;<strong style="color:${curColor}">${curColor}</strong>&nbsp; successfully!`
      )
    },
  },
}
</script>

<style>
.color-card {
  min-height: 100px;
}
.color-text {
  position: absolute;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.9);
  width: 100%;
  color: black;
}
</style>
