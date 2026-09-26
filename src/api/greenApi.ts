import type { Credentials } from '@/types/chat'
import axios from 'axios'

const getEndpointUrl = (
	{ idInstance, apiTokenInstance }: Credentials,
	endpoint: string,
	extraParam: string | number = '',
) => {
	const baseUrl = `https://api.green-api.com/waInstance${idInstance}/${endpoint}/${apiTokenInstance}`
	return extraParam ? `${baseUrl}/${extraParam}` : baseUrl
}

export const checkAccountApi = async (
	credentials: Credentials,
	phoneNumber: string,
) => {
	const { data } = await axios.post(
		getEndpointUrl(credentials, 'checkAccount'),
		{
			phoneNumber: Number(phoneNumber.replace(/\D/g, '')),
		},
	)
	return data
}

export const sendMessageApi = async (
	credentials: Credentials,
	chatId: string,
	message: string,
) => {
	const { data } = await axios.post(
		getEndpointUrl(credentials, 'sendMessage'),
		{
			chatId,
			message,
		},
	)
	return data
}

export const receiveNotificationApi = async (credentials: Credentials) => {
	const { data } = await axios.get(
		getEndpointUrl(credentials, 'receiveNotification'),
	)
	return data
}

export const deleteNotificationApi = async (
	credentials: Credentials,
	receiptId: number,
) => {
	const { data } = await axios.delete(
		getEndpointUrl(credentials, 'deleteNotification', receiptId),
	)
	return data
}
