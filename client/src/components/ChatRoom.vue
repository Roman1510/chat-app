<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head"></header>
      <section class="modal-card-body">
        <div class="tile is-ancestor">
          <div class="tile is-4 is-vertical is-parent">
            <div class="tile is-child box">
              <p class="subtitle">Participants</p>
              <div>
                <p>* FIRST</p>
                <p>* SECOND</p>
              </div>
            </div>
          </div>
          <div class="tile is-parent">
            <div class="tile is-child box">
              <div class="container">This is the chat</div>
            </div>
          </div>
        </div>
		
        <div class="box">
          <span class="icon-text">
            <span class="icon" :src="mdiSend">
            </span>
          </span>
        </div>
      </section>
      <footer class="modal-card-foot"></footer>
    </div>
  </div>
</template>
<script>
import { mdiSend } from '@mdi/js'
export default {
  name: 'ChatRoom',
  setup() {
    return { mdiSend }
  },
}
</script>
<style>
.tile .is-child .container {
  min-height: 350px;
}
</style>
