<template>
	<div class="hero is-fullheight">
		<div class="hero-body">
			<p>Username: {{ username }}</p>
			<p>Online:{{ users.length }}</p>
			<ChatRoom :messages="messages" @sendMessage="sendMessage" />
		</div>
	</div>
	<div class="modal" :class="{ 'is-active': modalIsActive }">
		<div class="modal-background"></div>
		<div class="modal-card">
			<header class="modal-card-head">
				<p class="modal-card-title">Please fill in the name:</p>
				<button class="delete" aria-label="close"></button>
			</header>
			<section class="modal-card-body">
				<div class="columns is-centered">
					<div class="column is-half">
						<input class="input" type="text" v-model="username" />
					</div>
				</div>
			</section>
			<footer class="modal-card-foot">
				<button class="button is-success" @click.prevent="changeUser">
					Save changes
				</button>
				<button class="button" @click.prevent="cancelModal">Cancel</button>
			</footer>
		</div>
	</div>
</template>

<script>
import ChatRoom from './components/ChatRoom.vue'
import { sendSocket, loggedIn } from './utilities/SocketConnect.js'

export default {
	/* 
  1. show the list of users
  2. make new styling
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
	name: 'app',
	components: { ChatRoom },
	data: function () {
		return {
			username: '',
			messages: [],
			users: [],
			modalIsActive: false,
		}
	},
	methods: {
		sendMessage: function (message) {
			sendSocket(message)
		},
		updateDataWS: function (messages, users) {
			this.messages = [...messages]
			this.users = [...users]
		},
	},
	mounted: function () {
		loggedIn(this.username, (messages, users) => {
			this.updateDataWS(messages, users)
		})
	},
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
