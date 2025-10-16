import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
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

function App() {
    const { user, loading } = useAuth();

    if (loading) return <p>Loading...</p>;

    console.log(user);

    return (
        <>
            <Toaster/>
            <Router>
                <Routes>
                    {/* Public (chưa login) */}
                    {!user && (
                    <Route element={<PublicLayout />}>
                        <Route path="/" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                    </Route>
                    )}

                    {/* Private (sau khi login) */}
                    {user && (
                    <Route
                        element={
                        <ProtectedRoute>
                            <PrivateLayout />
                        </ProtectedRoute>
                        }
                    >
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/tasks" element={<Task />} />
                        <Route path="/members" element={<Member />} />
						<Route path="/profile" element={<Profile/>} />
                    </Route>
                    )}
                </Routes>
            </Router>
        </>
    );
}

export default App;
