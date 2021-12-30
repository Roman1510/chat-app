<template>
	<div>
		<div class="columns my-5 mx-5">
			<div class="column is-half">
				<input type="text" placeholder="enter message" />
				<button class="button is-primary mx-2">Send</button>
			</div>
			<div class="column is-half">
				<div class="box is-0">{{ username }}</div>
				<input type="text" placeholder="enter username" v-model="username" />
			</div>
		</div>
		<div class="columns">
			<div class="column is-half">
				<div
					class="box"
					v-for="(message, index) in messages"
					:key="index"
				>{{message}}</div>
			</div>
		</div>
	</div>
</template>
<script>
import { ref } from 'vue'
import { io } from 'socket.io-client'
export default {
	name: 'apptest',
	setup() {
		const socket = io('http://localhost:3000')
		socket.on('message',(message)=>{
			console.log(message)
		})
		const messages = ref([])
		messages.value = ['asdf','asdgga','ashfah']
		const username = ref('')
		return {
			messages,
			username,
		}
	},
}
</script>
<style lang=""></style>
