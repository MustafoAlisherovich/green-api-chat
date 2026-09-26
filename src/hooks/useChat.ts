import type { Chat, Credentials, Message } from '@/types/chat'
import { useCallback, useEffect, useRef, useState } from 'react'

import {
	checkAccountApi,
	deleteNotificationApi,
	receiveNotificationApi,
	sendMessageApi,
} from '../api/greenApi'

const getTime = () =>
	new Date().toLocaleTimeString([], {
		hour: '2-digit',
		minute: '2-digit',
	})

export const useChat = (credentials: Credentials | null) => {
	const [chats, setChats] = useState<Chat[]>([])
	const [activeChatId, setActiveChatId] = useState<string>('')

	const processedReceiptIdsRef = useRef<Set<string>>(new Set())

	const addChat = async (phoneNumber: string) => {
		if (!credentials) return

		const formattedPhone = phoneNumber.replace(/\D/g, '')
		if (!formattedPhone) return

		try {
			const account = await checkAccountApi(credentials, formattedPhone)

			if (!account.exist || !account.chatId) {
				return console.error('Telegram account not found')
			}

			const chatId = String(account.chatId)

			setChats(prev => {
				if (prev.some(chat => chat.id === chatId)) return prev

				const newChat: Chat = {
					id: chatId,
					phoneNumber: formattedPhone,
					name: account.username || `+${formattedPhone}`,
					messages: [],
				}

				return [newChat, ...prev]
			})

			setActiveChatId(chatId)
		} catch (err) {
			console.error('Error checking Telegram account:', err)
		}
	}

	const sendMessage = async (text: string) => {
		if (!credentials || !activeChatId || !text.trim()) return

		const currentChat = chats.find(chat => chat.id === activeChatId)
		if (!currentChat) return

		const timeStr = getTime()
		const newMsg: Message = {
			id: `local-${Date.now()}`,
			text,
			timestamp: timeStr,
			isSender: true,
		}

		setChats(prev =>
			prev.map(chat =>
				chat.id === activeChatId
					? {
							...chat,
							lastMessage: text,
							lastMessageTime: timeStr,
							messages: [...chat.messages, newMsg],
						}
					: chat,
			),
		)

		try {
			await sendMessageApi(credentials, currentChat.id, text)
		} catch (err) {
			console.error('Error sending message:', err)
		}
	}

	const pollNotifications = useCallback(async () => {
		if (!credentials) return

		try {
			const data = await receiveNotificationApi(credentials)
			if (!data?.receiptId) return

			const receiptId = String(data.receiptId)

			if (
				processedReceiptIdsRef.current.has(receiptId) ||
				data.body?.typeWebhook !== 'incomingMessageReceived'
			) {
				await deleteNotificationApi(credentials, data.receiptId)
				processedReceiptIdsRef.current.add(receiptId)
				return
			}

			const { senderData = {}, messageData = {} } = data.body
			const senderId = String(senderData.chatId || senderData.sender || '')

			const messageText =
				messageData?.textMessageData?.textMessage ||
				messageData?.extendedTextMessageData?.text ||
				messageData?.extendedTextMessageData?.description ||
				''

			if (senderId && messageText) {
				const timeStr = getTime()
				const incomingMsg: Message = {
					id: `incoming-${receiptId}`,
					text: messageText,
					timestamp: timeStr,
					isSender: false,
				}

				setChats(prev => {
					const existingChat = prev.find(chat => chat.id === senderId)

					if (existingChat) {
						if (existingChat.messages.some(msg => msg.id === incomingMsg.id)) {
							return prev
						}

						return prev.map(chat =>
							chat.id === senderId
								? {
										...chat,
										lastMessage: messageText,
										lastMessageTime: timeStr,
										messages: [...chat.messages, incomingMsg],
									}
								: chat,
						)
					}

					const phoneNum = senderData.sender
						? String(senderData.sender).replace('@c.us', '')
						: ''

					const newChat: Chat = {
						id: senderId,
						phoneNumber: phoneNum,
						name:
							senderData.senderName || (phoneNum ? `+${phoneNum}` : senderId),
						lastMessage: messageText,
						lastMessageTime: timeStr,
						messages: [incomingMsg],
					}

					return [newChat, ...prev]
				})
			}

			processedReceiptIdsRef.current.add(receiptId)
			await deleteNotificationApi(credentials, data.receiptId)
		} catch (err) {
			console.error('Notification polling error:', err)
		}
	}, [credentials])

	useEffect(() => {
		if (!credentials) return

		let stopped = false
		let timeoutId: ReturnType<typeof setTimeout>

		const poll = async () => {
			if (stopped) return

			await pollNotifications()

			if (!stopped) {
				timeoutId = setTimeout(poll, 1000)
			}
		}

		poll()

		return () => {
			stopped = true
			clearTimeout(timeoutId)
		}
	}, [credentials, pollNotifications])

	return {
		chats,
		activeChatId,
		setActiveChatId,
		addChat,
		sendMessage,
	}
}
