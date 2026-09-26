import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { Credentials } from '@/types/chat'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface Props {
	onSaveCredentials: (creds: Credentials) => void
}

export function AuthPage({ onSaveCredentials }: Props) {
	const [idInstance, setIdInstance] = useState('')
	const [apiTokenInstance, setApiTokenInstance] = useState('')
	const navigate = useNavigate()

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		if (idInstance && apiTokenInstance) {
			onSaveCredentials({ idInstance, apiTokenInstance })
			navigate('/chat')
		}
	}

	return (
		<div className='min-h-screen bg-[#0f1013] text-white flex items-center justify-center p-4'>
			<div className='w-full max-w-md bg-[#1e1f24] border border-[#26272c] p-6 rounded-2xl shadow-xl'>
				<h2 className='text-2xl font-bold text-center mb-6'>
					GREEN-API Authorization
				</h2>
				<form onSubmit={handleSubmit} className='flex flex-col gap-4'>
					<div>
						<label className='text-xs text-gray-400 mb-1 block'>
							idInstance
						</label>
						<Input
							value={idInstance}
							onChange={e => setIdInstance(e.target.value)}
							placeholder='1101000000'
							className='bg-[#28292e] border-[#363841] text-white'
							required
						/>
					</div>
					<div>
						<label className='text-xs text-gray-400 mb-1 block'>
							apiTokenInstance
						</label>
						<Input
							type='password'
							value={apiTokenInstance}
							onChange={e => setApiTokenInstance(e.target.value)}
							placeholder='4f3f2a...'
							className='bg-[#28292e] border-[#363841] text-white'
							required
						/>
					</div>
					<Button
						type='submit'
						className='mt-2 bg-blue-600 hover:bg-blue-500 text-white font-medium'
					>
						Kirish
					</Button>
				</form>
			</div>
		</div>
	)
}
