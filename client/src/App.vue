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
html, body {
  margin:0;
  padding:0;
  height:100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: auto;
}

.fade-leave-to {
  opacity: 0;
}
.fade-leave-active {
  transition: 0.2s opacity ease-in-out;
}
</style>
