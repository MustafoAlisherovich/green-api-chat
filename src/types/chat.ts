export interface Credentials {
	idInstance: string
	apiTokenInstance: string
}

export interface Message {
	id: string
	text: string
	timestamp: string
	isSender: boolean
}

export interface Chat {
	id: string
	phoneNumber: string
	name: string
	lastMessage?: string
	lastMessageTime?: string
	avatarUrl?: string
	messages: Message[]
}
