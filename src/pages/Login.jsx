import { useState } from "react";
import GoogleButton from "react-google-button";
import { FaSpinner } from "react-icons/fa6";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate();

	const { login, isLoading } = useAuth();

	const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            toast.success("Logged in successfully!");
            navigate("/");
        } catch (err) {
            toast.error(err.message || "Login failed");
        }
    };


	return (
		<div className="min-h-screen bg-[#F0F4FC] flex flex-col">
			{/* Main content */}
			<main className="flex flex-1 container mx-auto px-6 py-12 gap-12">
				{/* Left intro */}
				<div className="flex-1 flex flex-col justify-center">
					<h1 className="text-3xl font-bold mb-4">
						Welcome to <span className="text-[#4461F2]">Taskie</span>
					</h1>
					<p className="text-gray-700 mb-6 leading-relaxed">
						Here, we believe that building a strong professional network begins
						with your participation. We are delighted to offer a modern and
						user-friendly service to ensure you have the best experience.
					</p>
				</div>

				{/* Right form */}
				<div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
					<h2 className="text-2xl font-bold mb-6">Sign in</h2>
					<form onSubmit={handleSubmit}>
						<input
							type="email"
							placeholder="Enter Email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							className="w-full text-sm text-gray-700 border border-gray-300 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-[#4461F2]"
						/>
						<input
							type="password"
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							className="w-full text-sm text-gray-700 border border-gray-300 rounded-lg px-4 py-3 mb-2 focus:outline-none focus:ring-2 focus:ring-[#4461F2]"
						/>
						<div className="flex mb-8 justify-between">
							<a href="/signup" className="text-sm text-[#4461F2] hover:underline">
								Dont't have an account?
							</a>
							<a href="#" className="text-sm text-[#4461F2] hover:underline">
								Recover Password?
							</a>
						</div>
						<button className="h-12 w-full bg-[#4461F2] text-white font-bold rounded-lg shadow-md mb-6">
							{isLoading ? (
								<FaSpinner className="animate-spin mx-auto" />
							) : (
								"Sign In"
							)}
						</button>
					</form>

					{/* Divider */}
					<div className="flex items-center mb-6">
						<div className="flex-1 h-px bg-gray-300"></div>
						<span className="text-gray-500 text-sm mx-4">Or Continue with</span>
						<div className="flex-1 h-px bg-gray-300"></div>
					</div>

					{/* Google Login */}
					<div className="flex justify-center">
						<GoogleButton type="dark"/>
					</div>
				</div>
			</main>

		</div>
	);
}

export default Login;
