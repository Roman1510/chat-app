<template>
  <transition name="fade">
    <router-view />
  </transition>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.fade-enter-from {

}
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active {

}
.fade-leave-active {
  transition: opacity 1s ease-out
}
</style>
