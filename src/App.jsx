import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./hooks/useAuth";
import Dashboard from "./pages/Dashboard";
import Member from "./pages/Member";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Task from "./pages/Task";
import PublicLayout from "./layouts/PublicLayout";
import PrivateLayout from "./layouts/PrivateLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import Splash from "./pages/Splash";

function App() {
	const { userAuth, loading } = useAuth();
	console.log(userAuth);
	
	if (loading) {
		return (
			<>
				<Toaster />
				<Splash />
			</>
		);
	}

	return (
		<>
			<Toaster />
			<BrowserRouter>
				<Routes>
					<Route element={<PublicLayout />}>
						<Route path="/login" element={<Login />} />
						<Route path="/signup" element={<Signup />} />
					</Route>

					<Route
						element={
							<ProtectedRoute>
								<PrivateLayout/>
							</ProtectedRoute>
						}
					>
						<Route path="/" element={<Dashboard />} />
						<Route path="/tasks" element={<Task />} />
						<Route path="/members" element={<Member />} />
						<Route path="/profile" element={<Profile />} />
					</Route>
					<Route path="*" element={<NotFound />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
