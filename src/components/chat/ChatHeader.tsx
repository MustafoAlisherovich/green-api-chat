import type { Chat } from '@/types/chat'
import { ArrowLeft, Search } from 'lucide-react'

interface Props {
	chat: Chat
}

function ChatHeader({ chat }: Props) {
	return (
		<div className='h-16 bg-[#1e1f24] border-b border-[#26272c] px-4 flex items-center justify-between z-10 text-white'>
			<div className='flex items-center gap-3'>
				<ArrowLeft className='w-5 h-5 text-gray-400 cursor-pointer' />
				<div className='w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center font-bold'>
					{chat.name.charAt(0).toUpperCase()}
				</div>
				<div>
					<h2 className='font-semibold text-sm'>{chat.name}</h2>
					<p className='text-xs text-gray-400'>Messages for yourself</p>
				</div>
			</div>
			<Search className='size-6 cursor-pointer' />
		</div>
	)
}

export default ChatHeader
