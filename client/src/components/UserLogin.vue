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
          <p class="title">Please enter your username and choose a room:</p>
        </div>
        <div class="column is-half is-narrow">
          <input class="input is-medium" type="text" />
          <div class="select is-primary is-medium my-5">
            <select>
              <option>Select dropdown</option>
              <option>With options</option>
            </select>
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
