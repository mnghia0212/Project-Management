import React, { useState } from "react";
import {
	FaPlus,
	FaMessage,
	FaBell,
	FaRegMessage,
	FaDumbbell,
	FaBellConcierge,
	FaBellSlash,
	FaRegBell,
} from "react-icons/fa6";
import avaTest from "../assets/react.svg";
import Modal from "./Modal";
import QuickTaskForm from "./QuickTaskForm";

const Header = ({ tabName }) => {
	const [showModal, setShowModal] = useState(false);
	return (
		<div className="mb-4">
			<div className="flex justify-between items-center p-5">
				<h1 className="text-3xl font-semibold">{tabName}</h1>
				<div className="flex items-center space-x-5">
					<button
						onClick={() => setShowModal(true)}
						className="flex items-center gap-2 bg-[var(--primary)] hover:bg-[var(--hover)] text-white px-4 py-2 rounded"
					>
						<FaPlus className="w-4 h-4" />
						<span>New Task</span>
					</button>

					<button className="text-gray-800 p-2">
						<FaRegMessage className="w-5 h-5" />
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
			<Modal
				showModal={showModal}
				setShowModal={setShowModal}
				title={"New Task"}
			>
				<QuickTaskForm showModal={showModal} setShowModal={setShowModal}/>
			</Modal>
		</div>
	);
};

export default Header;
