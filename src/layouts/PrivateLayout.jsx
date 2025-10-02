import { Outlet, Link, useNavigate } from "react-router-dom";
import logo from "../assets/react.svg";
import { useAuth } from "../hooks/useAuth";

function PrivateLayout() {
	const { logout } = useAuth();
	const navigate = useNavigate();
	
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await logout();
			navigate("/");
		} catch (err) {
			alert("Logout failed: " + err.message);
		}
	};

	const renderNavLink = (to, label) => {
		return (
			<Link
				key={to}
				to={to}
				className="text-[var(--text-primary)] hover:bg-[var(--primary)] hover:text-[var(--text-white)] p-2 rounded font-medium"
			>
				{label}
			</Link>
		);
	}

	return (
		<div className="flex h-screen">
			<nav className="w-64 bg-[var(--background)] text-white flex flex-col p-4 space-y-1 border-r-1 border-[var(--divider)]">
				{/* Sidebar */}
				<div className="flex items-center justify-center gap-2 mb-4">
					<Link to="/">
						<img src={logo} alt="Logo" className="w-12 h-12" />
					</Link>
					<h1 className="text-2xl font-bold text-[var(--primary)]">Taskie</h1>
				</div>
				<hr className="border-t-2 border-[var(--divider)] mb-3" />

				{/* Navigation Links */}
				<div className="flex-1 flex flex-col">
					<p className="m-0 text-xs text-[var(--text-secondary)] mb-3">MENU</p>
					{renderNavLink("/", "Dashboard")}
					{renderNavLink("/tasks", "Tasks")}
					{renderNavLink("/members", "Members")}
					{renderNavLink("/profile", "Profile")}
				</div>

				<button onClick={handleSubmit} className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
					Log out
				</button>
			</nav>

			{/* Main */}
			<main className="flex-1 bg-white">
				<Outlet />
			</main>
		</div>
	);
}

export default PrivateLayout;
