import { useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthPage } from './pages/AuthPage'
import { ChatPage } from './pages/ChatPage'
import type { Credentials } from './types/chat'

export function App() {
	const [credentials, setCredentials] = useState<Credentials | null>(null)

	return (
		<BrowserRouter>
			<Routes>
				<Route
					path='/'
					element={<AuthPage onSaveCredentials={setCredentials} />}
				/>
				<Route
					path='/chat'
					element={
						credentials ? (
							<ChatPage credentials={credentials} />
						) : (
							<Navigate to='/' replace />
						)
					}
				/>
			</Routes>
		</BrowserRouter>
	)
}

export default App
