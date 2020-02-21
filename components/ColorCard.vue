<template>
  <v-alert border="left" colored-border elevation="2">
    <h3 class="title">Clustered Colors By K-Means</h3>
    <v-divider class="mb-2"></v-divider>
    <v-row dense class="text-center justify-center">
      <v-col v-for="color in colors" :key="color" cols="3" md="1">
        <v-card
          ripple
          hover
          :color="color"
          class="color-card"
          @click="copyColorHex"
        >
          <v-card-title></v-card-title>
          <h4 class="pa-0 color-text subtitle-1 text-uppercase">{{ color }}</h4>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar" color="success" :timeout="1000">
      <div class="text-center" style="width:100%">
        Copy Hex Color {{ curColor }} successfully!
      </div>
    </v-snackbar>
  </v-alert>
</template>

<script>
export default {
  props: {
    colors: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      snackbar: false,
      curColor: ''
    }
  },
  methods: {
    copyColorHex(e) {
      const hex = e.target.querySelector('.color-text')
        ? e.target.querySelector('.color-text').textContent
        : e.target.textContent
      navigator.clipboard.writeText(hex.toUpperCase())
      this.snackbar = true
      this.curColor = hex.toUpperCase()
    }
  }
}
</script>

<style scoped>
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
