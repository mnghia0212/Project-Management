import { Outlet, Link, useNavigate } from "react-router-dom";
import logo from "../assets/react.svg";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";

const PrivateLayout = () => {
	const { logout, isloading } = useAuth();
	const navigate = useNavigate();
	
	const handleLogoutClick = async (e) => {
        e.preventDefault();
        try {
            await logout();
            toast.success("Logged out successfully!");
            navigate("/login");
        } catch (err) {
            toast.error(err.message || "Logout failed");
        }
    };

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

				<button onClick={handleLogoutClick} className="h-12 w-full bg-[#4461F2] text-white font-bold rounded-lg shadow-md mb-6">
					{isloading ? (
						<FaSpinner className="animate-spin mx-auto" />
					) : (
						"Log Out"
					)}
				</button>
			</nav>

			{/* Main */}
			<main className="flex-1 bg-white">
				<Outlet />
			</main>
		</div>
	);
}

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

export default PrivateLayout;
