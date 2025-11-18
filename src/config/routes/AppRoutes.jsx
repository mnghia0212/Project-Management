import { Routes, Route } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Dashboard from "../../pages/Dashboard";
import Member from "../../pages/Member";
import NotFound from "../../pages/NotFound";
import Login from "../../pages/Login";
import Signup from "../../pages/Signup";
import Task from "../../pages/Task";
import Profile from "../../pages/Profile";
import Splash from "../../pages/Splash";
import PublicLayout from "../../layouts/PublicLayout";
import PrivateLayout from "../../layouts/PrivateLayout";
import ProtectedRoute from "../../components/ProtectedRoute";

function AppRoutes() {
	const { userAuth, isInitializing, error } = useAuth();
	console.log(userAuth);

	if (isInitializing) {
		return <Splash role="status" aria-busy="true" />;
	}

	if (error) {
		return (
			<div className="h-screen flex items-center justify-center flex-col gap-4">
				<p className="text-[var(--danger)]">Auth error: {error.message}</p>
				<button
					onClick={() => window.location.reload()}
					className="bg-[var(--primary)] text-white px-4 py-2 rounded"
				>
					Retry
				</button>
			</div>
		);
	}

    return (
        <Routes>
            {!userAuth ? (
                <Route element={<PublicLayout />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            ) : (
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
                    <Route path="/profile" element={<Profile />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            )}
        </Routes>
    );
}

export default AppRoutes;