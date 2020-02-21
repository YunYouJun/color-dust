<template>
  <v-alert border="left" colored-border elevation="2">
    <h3 class="title">Clustered Colors By K-Means</h3>
    <v-divider class="mb-2"></v-divider>
    <v-row dense class="text-center justify-center">
      <v-col v-for="color in colors" :key="color" md="1" sm="3">
        <v-card ripple hover :color="color" class="color-card">
          <v-card-title></v-card-title>
          <v-card-text class="pa-0 color-text subtitle-1 text-uppercase">{{
            color
          }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
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
}
</style>
