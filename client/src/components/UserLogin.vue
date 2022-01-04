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
          <p class="title">Please enter your username and choose a room here 👉🏽</p>
        </div>
        <div class="column is-half">
          <div class="columns is-centered">
            <div class="column is-three-quarters">
              <input class="input is-medium is-rounded" placeholder="Username, e.g. Trailblazer999" type="text" />
              <div class="select is-primary is-medium is-rounded my-5">
                <select>
                  <option value="0">JavaScript (default)</option>
                  <option value="1">Swift</option>
                  <option value="2">Python</option>
                  <option value="3">Java</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'UserLogin',
}
</script>
<style lang=""></style>
