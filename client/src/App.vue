<template>
  <div id="app">
    <div class="columns">
      <div class="column green"></div>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client'
export default {
  name: 'app',
  components: {},
  data: function (){
    return {
      username: '',
      socket: io('http://localhost:3000'),
      messages:[],
      users:[]
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
