import React from "react";
import { Drawer, Button, Box, Typography, ButtonGroup } from "@mui/material";
import FullTaskForm from "./forms/FullTaskForm";


const TaskDrawer = ({ task, isOpen, isLoading, close, onSubmit }) => {	
	return (
		<Drawer
			anchor="right"
			open={isOpen}
			onClose={close}
		>
			<Box p={2} width={550} role="presentation">
				{/* Drawer Header */}
				<header className="flex justify-between items-center">
					<Typography variant="h6" fontWeight={700}>{task ? "Task Details" : "New Task"}</Typography>
					<ButtonGroup size="30" variant="text">
						{/* {task && <Button onClick={closeDrawer}>Update</Button>}
						<Button onClick={closeDrawer}>Delete</Button> */}
					</ButtonGroup>
				</header>

				<div className="border-t-1 border-[var(--divider)] my-3"/>
				
				{/* Drawer Body */}
				<div>
					<FullTaskForm task={task} isLoading={isLoading} onSubmit={onSubmit}/>
				</div>
			</Box>
		</Drawer>
	);
};

export default TaskDrawer;
