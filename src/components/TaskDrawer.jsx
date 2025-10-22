import React from "react";
import { Drawer, Button, Box, Typography, ButtonGroup } from "@mui/material";
import FullTaskForm from "./forms/FullTaskForm";


const TaskDrawer = ({ taskData, isOpenDrawer, closeDrawer }) => {		
	return (
		<Drawer
			anchor="right"
			open={isOpenDrawer}
			onClose={closeDrawer}
		>
			<Box p={2} width={550} role="presentation">
				{/* Drawer Header */}
				<header className="flex justify-between items-center">
					<Typography variant="h6" fontWeight={700}>{taskData ? "Task Details" : "New Task"}</Typography>
					<ButtonGroup size="30" variant="text">
						{/* {task && <Button onClick={closeDrawer}>Update</Button>}
						<Button onClick={closeDrawer}>Delete</Button> */}
					</ButtonGroup>
				</header>

				<div className="border-t-1 border-[var(--divider)] my-3"/>
				
				{/* Drawer Body */}
				<div>
					<FullTaskForm taskData={taskData} closeDrawer={closeDrawer}/>
				</div>
			</Box>
		</Drawer>
	);
};

export default TaskDrawer;
