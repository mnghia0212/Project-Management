import React from "react";
import { Drawer, Button, Box, Typography } from "@mui/material";
import FullTaskForm from "./FullTaskForm";


const TaskDrawer = ({ showDrawer, setShowDrawer, task }) => {
	
	return (
		<Drawer
			anchor="right"
			open={showDrawer}
			onClose={() => setShowDrawer(false)}
		>
			<Box p={2} width={400} role="presentation">
				{/* Drawer Header */}
				<header className="flex justify-between items-center">
					<Typography variant="h6" fontWeight={700}>Task Detail</Typography>
					<Button onClick={() => setShowDrawer(false)}>Close</Button>
				</header>

				<div className="border-t-1 border-[var(--divider)] my-3"/>
				
				{/* Drawer Body */}
				<div>
					<FullTaskForm task={task} setShowDrawer={setShowDrawer} />
				</div>
			</Box>
		</Drawer>
	);
};

export default TaskDrawer;
