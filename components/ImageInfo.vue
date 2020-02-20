<template>
  <div class="info-wrap">
    <v-alert border="left" colored-border color="success">
      Found about
      <span class="info">{this.props.processInfo.colors}</span>
      colors in your image.
    </v-alert>
    <v-alert border="left" colored-border color="info" elevation="2">
      Color Census Time is
      <span class="info">{this.props.processInfo.colors}</span>
      ms.
    </v-alert>
    <v-alert border="left" colored-border color="warning" elevation="2">
      K-Means iterated
      <span class="info">{this.props.processInfo.kmeansIteration}</span> times
      with cost of
      <span class="info">{this.props.processInfo.kmeansTime}</span>ms.
    </v-alert>
    <v-alert border="left" colored-border color="error" elevation="2">
      The top5 colors account for
      <span class="info">{this.props.processInfo.top5Count.toFixed(1)}%</span>
      of total.
    </v-alert>
  </div>
</template>
