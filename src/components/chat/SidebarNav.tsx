import {
	Folder,
	MessageSquare,
	Phone,
	Radio,
	Settings,
	Users,
} from 'lucide-react'

export function SidebarNav() {
	return (
		<div className='w-16 bg-card flex flex-col items-center justify-between py-4 border-r border-[#26272c] text-muted-foreground'>
			<div className='flex flex-col items-center gap-6'>
				<button className='flex flex-col items-center text-xs text-white gap-1'>
					<div className='p-2 rounded-xl bg-[#23252b]'>
						<MessageSquare className='w-5 h-5 text-primary' />
					</div>
					<span>All</span>
				</button>
				<button className='flex flex-col items-center text-xs hover:text-white gap-1'>
					<Folder className='w-5 h-5' />
					<span>New</span>
				</button>
				<button className='flex flex-col items-center text-xs hover:text-white gap-1'>
					<Radio className='w-5 h-5' />
					<span>Channels</span>
				</button>
				<button className='flex flex-col items-center text-xs hover:text-white gap-1'>
					<Users className='w-5 h-5' />
					<span>Contacts</span>
				</button>
				<button className='flex flex-col items-center text-xs hover:text-white gap-1'>
					<Phone className='w-5 h-5' />
					<span>Calls</span>
				</button>
			</div>
			<button className='flex flex-col items-center text-xs hover:text-white gap-1'>
				<Settings className='w-5 h-5' />
				<span>Settings</span>
			</button>
		</div>
	)
}
