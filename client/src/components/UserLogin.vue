<template>
  <section class="hero is-halfheight is-link is-bold">
    <div class="hero-body">
      <div class="container">
        <p class="title">Developer's lair</p>
        <p class="subtitle">built with Vue 3 by @romanXVX</p>
      </div>
    </div>
  </section>
  <section class="hero is-halfheight is-info">
    <div class="hero-body">
      <div class="columns">
        <div class="column is-half">
          <p class="title">
            Please enter your username and choose a room here 👉🏽
          </p>
        </div>
        <div class="column is-half">
          <div class="columns is-centered">
            <form @submit.enter.prevent="submitForm">
              <div class="column is-three-quarters">
                <input
                  v-model="username"
                  class="input is-medium is-rounded"
                  placeholder="Username, e.g. Trailblazer999"
                  type="text"
                />
                <div class="select is-primary is-medium is-rounded my-5">
                  <select v-model="room">
                    <option value="0">JavaScript (default)</option>
                    <option value="1">Swift</option>
                    <option value="2">Python</option>
                    <option value="3">Java</option>
                  </select>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { ref } from 'vue'
import { setCurrentUser } from '../utilities/UserData'
import { useRouter /*useRoute*/ } from 'vue-router'
export default {
  name: 'UserLogin',
  setup() {
    // const route = useRoute();
    const router = useRouter()
    // const redirectPath = route.query.redirect || '/chat';
    const username = ref('')
    const room = ref('0')
    const submitForm = () => {
      setCurrentUser({
        user: username.value,
        room: room.value,
      })

      router.push('chat')
    }
    return {
      username,
      room,
      submitForm,
    }
  },
}
</script>
<style lang=""></style>
