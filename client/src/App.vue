<template>
<ChatRoom/>
</template>

<script>
  /* 
  1. show the list of users
  2. make new styling

  maybe in the future:
  2.1 make styling for modal prompt + localstorage to store the user's info (at least the name, that the particular name is online)
  3. show in the chat when someone joins
  4. show in the chat when someone leaves
  5. make the sounds
  6. deploy to cloud
  7. make history to be saved on client's side. (with the button to reset)
  8. make the possibility to send files
  9. connect the db to store users / auth

    1)move credentials to env file
    2)put socket operations in a separate file
    3)update the variables from the external file reactively
  */

import ChatRoom from './components/ChatRoom.vue'
export default {
  name: 'app',
  components: { ChatRoom },
}

</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
