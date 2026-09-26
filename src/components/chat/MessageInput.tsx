import { ArrowUp, Camera, Mic, Paperclip, Smile } from 'lucide-react'
import { useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

interface Props {
	onSendMessage: (text: string) => void
}

function MessageInput({ onSendMessage }: Props) {
	const [text, setText] = useState('')

	const handleSend = (e: React.FormEvent) => {
		e.preventDefault()
		if (text.trim()) {
			onSendMessage(text)
			setText('')
		}
	}

	return (
		<div className='p-4 z-10 flex justify-center w-full'>
			<form
				onSubmit={handleSend}
				className='bg-[#1c1d22]/90 backdrop-blur-md rounded-2xl px-4 py-2 flex items-center gap-3 border border-white/5 w-full max-w-3xl shadow-lg'
			>
				<Button
					size={'icon-lg'}
					variant={'ghost'}
					className='text-muted-foreground hover:text-white transition-colors'
				>
					<Paperclip className='size-5 -rotate-45' />
				</Button>

				<Input
					value={text}
					onChange={e => setText(e.target.value)}
					placeholder='Message'
					className='bg-transperent dark:bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-500 h-9 p-0 text-sm flex-1'
				/>

				{/* O'ng tarafdagi ikonkalar */}
				<div className='flex items-center gap-3 text-gray-400'>
					<Button size={'icon-lg'} variant={'ghost'} className='rounded-full'>
						<Smile className='size-5' />
					</Button>

					{text.trim() ? (
						<Button size={'icon-lg'} type='submit' className='rounded-full'>
							<ArrowUp className='plasmo-size-4' aria-hidden='true' />
						</Button>
					) : (
						<>
							<Button
								size={'icon-lg'}
								variant={'ghost'}
								className='hover:text-white transition-colors'
							>
								<Camera className='size-5' />
							</Button>
							<Button
								size={'icon-lg'}
								variant={'ghost'}
								className='hover:text-white transition-colors'
							>
								<Mic className='size-5' />
							</Button>
						</>
					)}
				</div>
			</form>
		</div>
	)
}

export default MessageInput
