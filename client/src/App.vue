<template>
  <router-view v-slot="{ Component }">
  <transition name="fade">
    <component :is="Component" />
  </transition>
</router-view>
</template>

<script>


</script>
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
