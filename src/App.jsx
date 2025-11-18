import { Toaster } from "react-hot-toast";
import AppRoutes from "./config/routes/AppRoutes.jsx";
import { BrowserRouter } from "react-router-dom";


function App() {
	return (
		<>
			<Toaster />
			<BrowserRouter>
				<AppRoutes/>
			</BrowserRouter>
		</>
	);
}

export default App;
