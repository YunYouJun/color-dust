<template>
  <div class="info-wrap">
    <v-alert border="left" colored-border color="success">
      {{
        $t('color.info.amount', {
          amount: $store.state.processInfo.numberOfColors,
        })
      }}
    </v-alert>
    <v-alert border="left" colored-border color="info">
      {{ $t('color.info.time', { time: $store.state.processInfo.censusTime }) }}
    </v-alert>
    <v-alert border="left" colored-border color="warning">
      {{
        $t('color.info.kmeans', {
          iteration: $store.state.processInfo.kmeansIteration,
          time: $store.state.processInfo.kmeansTime,
        })
      }}
    </v-alert>
    <v-alert border="left" colored-border color="error">
      {{
        $t('color.info.top5', {
          percent: $store.state.processInfo.top5Count.toFixed(2),
        })
      }}
    </v-alert>
  </div>
</template>
