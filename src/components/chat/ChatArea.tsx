import type { Chat } from '@/types/chat'
import { CheckCheck } from 'lucide-react'
import ChatHeader from './ChatHeader'
import MessageInput from './MessageInput'

interface Props {
	chat: Chat | undefined
	onSendMessage: (text: string) => void
}

export function ChatArea({ chat, onSendMessage }: Props) {
	if (!chat) {
		return (
			<div className='flex-1 bg-[#0f1013] flex items-center justify-center text-gray-500 relative overflow-hidden'>
				<div
					className='absolute inset-0 opacity-50 pointer-events-none bg-repeat z-0'
					style={{
						backgroundImage: `url("https://i.pinimg.com/736x/0c/11/45/0c1145ce09ec11b9f3342eaf92e7a90d.jpg")`,
						backgroundSize: '420px',
					}}
				/>

				<div className='z-10 bg-[#18191e]/80 text-muted-foreground text-xs px-4 py-1.5 rounded-full backdrop-blur-sm border border-white/5'>
					Select a chat
				</div>
			</div>
		)
	}

	return (
		<div className='flex-1 flex flex-col h-full bg-[#0f1015] relative overflow-hidden'>
			<div
				className='absolute inset-0 opacity-50 pointer-events-none bg-repeat'
				style={{
					backgroundImage: `url("https://i.pinimg.com/736x/0c/11/45/0c1145ce09ec11b9f3342eaf92e7a90d.jpg")`,
					backgroundSize: '420px',
				}}
			/>

			{/* Chat Header */}
			<ChatHeader chat={chat} />

			<div className='flex-1 overflow-y-auto p-4 md:p-6 flex flex-col justify-end gap-2 z-10 w-full max-w-3xl mx-auto'>
				<div className='text-center my-3'>
					<span className='bg-[#18191e]/80 text-gray-400 text-xs px-3 py-1 rounded-full backdrop-blur-sm border border-white/5'>
						Today
					</span>
				</div>

				{chat.messages.length === 0 && (
					<div className='flex flex-col items-center justify-center my-auto gap-1'>
						<span className='bg-[#18191e]/80 text-gray-400 text-xs px-4 py-1.5 rounded-full backdrop-blur-sm border border-white/5'>
							Save something
						</span>
					</div>
				)}

				{chat.messages.map(msg => (
					<div
						key={msg.id}
						className={`flex flex-col max-w-[85%] sm:max-w-[75%] ${
							msg.isSender ? 'ml-auto items-end' : 'mr-auto items-start'
						}`}
					>
						<div
							className={`px-3.5 py-1.5 rounded-2xl text-sm flex items-end gap-2 text-white shadow-md ${
								msg.isSender
									? 'bg-linear-to-r from-indigo-500 via-purple-500 to-fuchsia-600 rounded-br-none'
									: 'bg-[#2a2d3d] rounded-bl-none'
							}`}
						>
							<span className='whitespace-pre-wrap wrap-break-word leading-relaxed'>
								{msg.text}
							</span>
							<div className='flex items-center gap-1 text-[10px] opacity-70 ml-1 shrink-0 select-none pb-0.5'>
								<span>{msg.timestamp}</span>
								{msg.isSender && (
									<CheckCheck className='w-3.5 h-3.5 text-blue-200' />
								)}
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Input Panel */}
			<MessageInput onSendMessage={onSendMessage} />
		</div>
	)
}
