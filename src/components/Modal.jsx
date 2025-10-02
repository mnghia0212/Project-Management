import React, { useEffect } from "react";

const Modal = ({ showModal, setShowModal, title, children }) => {	
	useEffect(() => {
		const handleEsc = (e) => {
			if (e.key === "Escape") setShowModal(false);
		};
		document.addEventListener("keydown", handleEsc);
		return () => document.removeEventListener("keydown", handleEsc);
	}, [setShowModal]);

	return (
		showModal && (
			<div className="fixed inset-0 flex items-center justify-center z-50">
				{/* Overlay mờ */}
				<div
					onClick={() => setShowModal(false)}
					className="absolute inset-0 bg-gray-200 opacity-80"
				></div>
				{/* Modal content */}
				<div className="bottom-10 relative bg-[var(--background)] py-5 rounded shadow-md w-full max-w-md h-auto max-h-[90vh] overflow-y-auto flex flex-col justify-between">
					{/* Header Modal */}
					<header className="flex justify-between mb-4 px-4" >
						<h2 className="text-xl font-semibold">{title}</h2>
						<button
							onClick={() => setShowModal(false)}
							className="text-gray-600 hover:text-gray-800"
						>&#10005;</button>
					</header>
					<div className="border-t-1 border-[var(--divider)]"/>

					{/* Body Modal */}
					<div className="p-4">
						{children}
					</div>
				</div>
			</div>
		)
	);
};

export default Modal;
