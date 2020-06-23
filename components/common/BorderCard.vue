<template>
  <v-alert colored-border border="left" :elevation="2">
    <h3>
      <v-icon
        v-for="(icon, i) in icons"
        :key="i"
        :color="icon.color"
        class="mx-1"
        >{{ icon.name }}</v-icon
      >
    </h3>
    <slot></slot>
  </v-alert>
</template>

<script>
export default {
  props: {
    icons: {
      type: Array,
      default() {
        return []
      },
    },
  },
}
</script>
