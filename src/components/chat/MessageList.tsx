import { Button } from '@/components/ui/button'
import type { Chat } from '@/types/chat'
import { Bookmark, CheckCheck, Plus, Search } from 'lucide-react'
import { useState } from 'react'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '../ui/dialog'
import { Input } from '../ui/input'

interface Props {
	chats: Chat[]
	activeChatId: string
	onSelectChat: (id: string) => void
	onAddChat: (phone: string) => void
}

export function MessageList({
	chats,
	activeChatId,
	onSelectChat,
	onAddChat,
}: Props) {
	const [phoneNumber, setPhoneNumber] = useState('')
	const [open, setOpen] = useState(false)

	const handleCreateChat = () => {
		if (phoneNumber.trim()) {
			onAddChat(phoneNumber)
			setPhoneNumber('')
			setOpen(false)
		}
	}

	return (
		<div className='w-100 bg-card border-r border-[#26272c] flex flex-col h-full text-white'>
			{/* Header */}
			<div className='p-4 flex items-center justify-between'>
				<h1 className='text-2xl font-bold'>Chats</h1>
				<Dialog open={open} onOpenChange={setOpen}>
					<DialogTrigger>
						<Button
							size='icon'
							className='size-9 rounded-full bg-blue-600 hover:bg-blue-500'
						>
							<Plus className='w-5 h-5' />
						</Button>
					</DialogTrigger>
					<DialogContent className='bg-[#1e1f24] text-white border-[#26272c]'>
						<DialogHeader>
							<DialogTitle>Create new chat</DialogTitle>
						</DialogHeader>
						<div className='flex flex-col gap-4 py-4'>
							<Input
								placeholder='Phone number (example: 79991234567)'
								value={phoneNumber}
								onChange={e => setPhoneNumber(e.target.value)}
								className='bg-[#2b2c33] border-[#363841] text-white'
							/>
							<Button
								onClick={handleCreateChat}
								className='bg-blue-600 hover:bg-blue-500'
							>
								Start the chat
							</Button>
						</div>
					</DialogContent>
				</Dialog>
			</div>

			{/* Search */}
			<div className='px-4 pb-3'>
				<div className='relative'>
					<Search className='w-4 h-4 absolute left-3 top-2.5 text-gray-400' />
					<Input
						placeholder='Search'
						className='pl-9 bg-[#28292e] border-none text-sm placeholder:text-gray-500 h-9'
					/>
				</div>
			</div>

			{/* List */}
			<div className='flex-1 overflow-y-auto'>
				{chats.map(chat => {
					const isActive = chat.id === activeChatId
					return (
						<div
							key={chat.id}
							onClick={() => onSelectChat(chat.id)}
							className={`flex items-center gap-3 p-3 cursor-pointer transition-colors ${
								isActive ? 'bg-[#2b2d35]' : 'hover:bg-[#25262c]'
							}`}
						>
							<div className='size-14 rounded-full bg-blue-500 flex items-center justify-center font-bold text-lg shrink-0'>
								{chat.id === 'saved_messages' ? (
									<Bookmark className='w-6 h-6 fill-white' />
								) : (
									chat.name.charAt(0).toUpperCase()
								)}
							</div>
							<div className='flex-1 min-w-0'>
								<div className='flex items-center justify-between'>
									<h3 className='font-semibold text-sm truncate'>
										{chat.name}
									</h3>
									<span className='text-xs text-gray-400'>
										{chat.lastMessageTime}
									</span>
								</div>
								<div className='flex items-center gap-1 text-xs text-gray-400 mt-1 truncate'>
									{chat.id === 'saved_messages' && (
										<CheckCheck className='w-3.5 h-3.5 text-blue-400' />
									)}
									<span className='truncate text-sm'>
										{chat.lastMessage || 'No messages'}
									</span>
								</div>
							</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}
