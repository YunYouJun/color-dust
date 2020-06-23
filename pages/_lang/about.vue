<template>
  <v-layout>
    <v-flex class="text-center">
      <color-logo class="my-8" />
      <blockquote class="mt-2">
        {{ $t('about.description') }}
      </blockquote>
      <blockquote class="mt-3 blockquote">
        {{ $t('about.quote.content') }}
        <footer class="mt-3">
          <small>
            <em>
              <a
                href="https://hanyu.baidu.com/shici/detail?pid=42650fdc9f454f0a89c90ad9ebb20009&highlight=色尘知有数，劫烬岂无年"
                target="blank"
                style="text-decoration: none;"
                >{{ $t('about.quote.from') }}
              </a>
            </em>
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
    ColorLogo,
  },
  head() {
    return {
      title: this.$t('links.about'),
    }
  },
}
</script>
