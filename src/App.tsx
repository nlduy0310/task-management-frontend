import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import SignIn from './pages/signin/SignIn';
import SignUp from './pages/signup/SignUp';

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />}></Route>
					<Route path="/signin" element={<SignIn />}></Route>
					<Route path="/signup" element={<SignUp />}></Route>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
