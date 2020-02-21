<template>
  <div class="info-wrap">
    <v-alert border="left" colored-border color="success">
      Found about
      <span class="font-weight-bold">{{
        $store.state.processInfo.colors
      }}</span>
      colors in your image.
    </v-alert>
    <v-alert border="left" colored-border color="info">
      Color Census Time is
      <span class="font-weight-bold">{{
        $store.state.processInfo.censusTime
      }}</span>
      ms.
    </v-alert>
    <v-alert border="left" colored-border color="warning">
      K-Means iterated
      <span class="font-weight-bold">{{
        $store.state.processInfo.kmeansIteration
      }}</span>
      times with cost of
      <span class="font-weight-bold">{{
        $store.state.processInfo.kmeansTime
      }}</span>
      ms.
    </v-alert>
    <v-alert border="left" colored-border color="error">
      The top5 colors account for
      <span class="font-weight-bold"
        >{{ $store.state.processInfo.top5Count.toFixed(2) }}%</span
      >
      of total.
    </v-alert>
  </div>
</template>
