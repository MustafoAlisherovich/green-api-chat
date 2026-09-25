import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AuthPage from './pages/AuthPage'
import ChatPage from './pages/ChatPage'
import NotFoundPage from './pages/NotFoundPage'

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<ChatPage />} />
				<Route path='/auth' element={<AuthPage />} />
				<Route path='*' element={<NotFoundPage />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
