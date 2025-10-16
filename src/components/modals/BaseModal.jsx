import { Box, Modal, Typography } from "@mui/material";
import React, { useEffect } from "react";

const BaseModal = ({ title, children, isOpen, close }) => {
	useEffect(() => {
		const handleEsc = (e) => {
			if (e.key === "Escape") close();
		};
		document.addEventListener("keydown", handleEsc);
		return () => document.removeEventListener("keydown", handleEsc);
	}, [close]);

	return (
		<Modal
			open={isOpen}
			onClose={close}
			aria-labelledby="modal-title"
			aria-describedby="modal-description"
		>
			<Box sx={style}>
				<Typography id="modal-title" variant="h6" component="h2">
					{title}
				</Typography>
				<Typography id="modal-description" sx={{ mt: 3 }} component="div">
					{children}
				</Typography>
			</Box>
		</Modal>
	);
};

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	borderRadius: 2,
	p: 3,
};

export default BaseModal;
