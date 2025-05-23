// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

interface Brew {
	task: string
	description: string
	steps: string[]
	progress: number
	notes: string[]
	drink: string
}

interface Message {
	author: string
	text: string
	timeSent: Date
}

interface User {
	username: string
	email: string
	password: string // hashed
	friends: User[]
	prefersDarkMode: boolean
	preferredLanguage: string
}	