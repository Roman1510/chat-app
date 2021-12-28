<template lang="">
	<div>
		<div class="columns my-5 mx-5">
			<div class="column is-half">
				<input type="text" placeholder="enter message" />
				<button class="button is-primary mx-2">Send</button>
			</div>
			<div class="column is-half">
				<div class="box is-0">{{ username }}</div>
				<input type="text" placeholder="enter username" v-model="username" />
				<button class="button is-primary mx-2" @click.prevent="logIn">
					Log in
				</button>
				<button class="button is-primary mx-2" @click.prevent="logOut">
					Log out
				</button>
			</div>
		</div>
		<div class="columns">
			<div class="column is-half">
				<div class="box"></div>
				<div class="box"></div>
				<div class="box"></div>
			</div>
		</div>
	</div>
</template>
<script>
import { ref } from 'vue'
import ChatRoom from './components/ChatRoom.vue'
import { leaveParty, loggedIn, sendSocket } from './utilities/SocketConnect'

export default {
	name: 'apptest',
	setup() {
		const messages = ref([])
		const username = ref('')
		const users = ref([])
		const sendMessage = (message) => {
			sendSocket(message)
		}
		const updateData = (messages, users) => {
            messages.value = [...messages]
            users.value = [...users]
        }
		const logIn = () => {
			loggedIn(username.value, (messages, users) => updateData(messages,users))
		}
		const logOut = () => {
			leaveParty()
		}
		return {
			username,
			users,
			//
			messages,
			sendMessage,
			ChatRoom,
			logIn,
			logOut,
		}
	},
}
</script>
<style lang=""></style>
