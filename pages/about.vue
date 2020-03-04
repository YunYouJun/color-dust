<template>
  <v-layout>
    <v-flex class="text-center">
      <color-logo class="my-5" />
      <blockquote>
        色尘，佛教语。“六尘”之一。 即眼根（视觉）所触及的尘境。
      </blockquote>
      <blockquote class="blockquote">
        色尘知有数，劫烬岂无年。
        <footer>
          <small>
            <em>—— 唐·李绅《题法华寺》</em>
          </small>
        </footer>
      </blockquote>
    </v-flex>
  </v-layout>
</template>

<script>
import ColorLogo from '~/components/ColorLogo.vue'
export default {
  components: {
    ColorLogo
  },
  head() {
    return {
      title: 'About'
    }
  }
}
</script>
