<template>
  <div class="score-layer text-center">
    <svg class="circle" viewBox="0,0,120,120">
      <defs>
        <linearGradient
          v-for="(loopColor, index) in loopColors"
          :id="'basic' + index"
          :key="'basic' + index"
          x1="0"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop
            offset="0%"
            :style="{ stopColor: loopColor[0], stopOpacity: 1 }"
          ></stop>
          <stop
            offset="100%"
            :style="{ stopColor: loopColor[1], stopOpacity: 1 }"
          ></stop>
        </linearGradient>
      </defs>
      <g v-for="(value, index) in stars" :key="index">
        <path
          :class="'c' + index"
          d="m 40 25.35 q 20 -25.35 40 0 q 31.96 4.65 20 34.64 q 11.96 30 -20 34.64 q -20 25.35 -40 0 q -31.96 -4.65 -20 -34.64 q -11.96 -30 20 -34.64"
        />
        <animateTransform
          attributeName="transform"
          begin="0s"
          :dur="18 - 3 * index + 's'"
          type="rotate"
          from="0, 60, 60"
          :to="(index % 2 ? '360' : '-360') + ',60, 60'"
          repeatCount="indefinite"
        />
      </g>
      <g>
        <circle cx="60" cy="60" r="45" class="c0">
          <animate
            attributeName="r"
            values="45;40;45"
            dur="10s"
            repeatCount="indefinite"
          />
        </circle>
      </g>
    </svg>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      stars: [1, 2, 3],
    }
  },
  computed: {
    ...mapState(['loopColors']),
  },
}
</script>

<style lang="scss">
.circle {
  width: 100%;
  height: 100vw;
  max-height: 450px;
}

.circle .c0 {
  stroke: none;
  stroke-width: 0;
  fill: url('#basic0');
}

.circle .c1 {
  stroke: none;
  stroke-width: 0;
  fill: url('#basic1');
  stroke-linecap: round;
}

.circle .c2 {
  transform: rotate(20deg);
  transform-origin: center;
  stroke: none;
  stroke-width: 0;
  fill: url('#basic2');
  stroke-linecap: round;
}

.circle .c3 {
  transform: rotate(40deg);
  transform-origin: center;
  stroke: none;
  stroke-width: 0;
  fill: url('#basic3');
  stroke-linecap: round;
}
</style>
