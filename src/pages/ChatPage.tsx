import { MessageList } from '@/components/chat/MessageList'
import type { Credentials } from '@/types/chat'
import { ChatArea } from '../components/chat/ChatArea'
import { SidebarNav } from '../components/chat/SidebarNav'
import { useChat } from '../hooks/useChat'

interface Props {
	credentials: Credentials | null
}

export function ChatPage({ credentials }: Props) {
	const { chats, activeChatId, setActiveChatId, addChat, sendMessage } =
		useChat(credentials)
	const currentChat = chats.find(c => c.id === activeChatId)

	return (
		<div className='flex h-screen w-screen overflow-hidden bg-[#0f1013]'>
			<SidebarNav />
			<MessageList
				chats={chats}
				activeChatId={activeChatId}
				onSelectChat={setActiveChatId}
				onAddChat={addChat}
			/>
			<ChatArea chat={currentChat} onSendMessage={sendMessage} />
		</div>
	)
}
