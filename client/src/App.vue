<template>
	<form class="box">
		<div class="field">
			<label class="label"
				>Username: {{ username && !modalIsActive ? username : '' }}</label
			>
		</div>
		<div class="field">
			<label class="label">Online:{{ users.length }}</label>
		</div>
		<button
			class="button is-primary"
			@click.prevent="username ? signOut() : openModal()"
		>
			{{ username ? 'Log out' : 'Log in' }}
		</button>
	</form>
	<ChatRoom :messages="messages" @sendMessage="sendMessage" />
	<div class="modal" :class="{ 'is-active': modalIsActive }">
		<div class="modal-background"></div>
		<div class="modal-card">
			<header class="modal-card-head">
				<p class="modal-card-title">Please fill in the name:</p>
				<button
					class="delete"
					@click.prevent="closeModal"
					aria-label="close"
				></button>
			</header>
			<section class="modal-card-body">
				<div class="columns is-centered">
					<div class="column is-half">
						<input class="input is-primary" type="text" v-model="username" />
					</div>
				</div>
			</section>
			<footer class="modal-card-foot">
				<button class="button is-success" @click.prevent="setUsername">
					Save changes
				</button>
				<button class="button" @click.prevent="closeModal">Cancel</button>
			</footer>
		</div>
	</div>
</template>

<script>
import ChatRoom from './components/ChatRoom.vue'
import {
	sendSocket,
	loggedIn,
	leaveParty,
	establishWS,
} from './utilities/SocketConnect.js'
import {
	setCurrentUser,
	getCurrentUser,
	removeUser,
} from './utilities/StoreUser'

export default {
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

	name: 'app',
	components: { ChatRoom },
	data: function () {
		return {
			username: getCurrentUser(),
			messages: [],
			users: [],
			modalIsActive: false,
		}
	},
	methods: {
		initialize: function () {
			console.log('initialize was called', this.username)
			
			if (this.username) {
				establishWS()
				loggedIn(this.username, (messages, users) => {
					this.updateDataWS(messages, users)
				})
			}
		},
		sendMessage: function (message) {
			sendSocket(message)
		},
		updateDataWS: function (messages, users) {
			this.messages = [...messages]
			this.users = [...users]
		},
		getUsername: function () {
			const currentUser = getCurrentUser()
			if (currentUser !== this.username) {
				this.username = currentUser
			}
		},
		signOut: function () {
			removeUser()
			leaveParty()
			this.username = ''
			this.messages = []
		},
		setUsername: function () {
			setCurrentUser(this.username)
			this.closeModal()
			this.initialize()
		},
		// modal
		closeModal: function () {
			this.modalIsActive = false
		},
		openModal: function () {
			this.modalIsActive = true
		},
	},
	mounted: function () {
		if (!this.username) {
			this.modalIsActive = true
		} else {
			this.initialize()
		}
	},
}
</script>
<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
</style>
