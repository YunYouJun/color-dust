<template>
  <img class="ColorLogo" alt="Color Logo" src="~static/color.png" />
</template>

<style>
.ColorLogo {
  width: 180px;
  transform: rotateY(560deg);
  animation: turn 3.5s ease-out forwards 1s;
}

@keyframes turn {
  100% {
    transform: rotateY(0deg);
  }
}
</style>
