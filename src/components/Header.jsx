import { FaRegBell } from "react-icons/fa6";
import avaTest from "../assets/react.svg";
import QuickTaskModal from "./modals/QuickTaskModal";
import { useToggle } from "../hooks/useToggle";

const Header = ({ tabName }) => {
  	const { isOpen, isLoading, open, close, onSubmit } = useToggle();

	return (
		<div className="mb-4">
			<div className="flex justify-between items-center p-5">
				<h1 className="text-3xl font-semibold">{tabName}</h1>
				<div className="flex items-center space-x-5">
					<button
						onClick={open}
						className="flex items-center gap-2 bg-[var(--primary)] hover:bg-[var(--hover)] text-white px-4 py-2 rounded"
					>
						Quick Task
					</button>

					<button className="text-gray-800 p-2">
						<FaRegBell className="w-5 h-5" />
					</button>

					<img
						src={avaTest}
						alt="User Avatar"
						className="w-8 h-8 rounded-full"
					/>
				</div>
			</div>
			<hr className="border-t-2 border-[var(--divider)]" />
			<QuickTaskModal isOpen={isOpen} isLoading={isLoading} close={close} open={open} onSubmit={onSubmit}/>
		</div>
	);
};

export default Header;
