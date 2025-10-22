import Header from "../components/Header";
import { FaPlus } from "react-icons/fa6";
import TaskList from "../components/TaskList";
import { useToggle } from "../hooks/useToggle";
import TaskDrawer from "../components/TaskDrawer";


const Task = () => {
	const { isOpen, open, close } = useToggle();

	return (
		<div className="flex flex-col h-screen">
			<Header tabName="Tasks" />
			{/* Header tasks */}
			<header className="flex justify-between items-center mb-5 px-5">
				{/* Button new task */}
				<div>
					<button onClick={open} className="flex items-center px-2 py-1 rounded-sm text-white bg-[var(--primary)] space-x-2">
						<FaPlus className="w-3 h-3 align-middle text-base" />
						<span>New Task</span>
					</button>
				</div>
				
				{/* Select view mode */}
				<div className="flex gap-5">
					<button>Table</button>
					<button>List View</button>
					<button>Kanban</button>
				</div>
			</header>

			{/* Drawer New Task */}
			<TaskDrawer
				taskData={null}
				isOpenDrawer={isOpen}		
				closeDrawer={close} 
			/>

			{/* Task List */}
			<TaskList />
		</div>
	);
};

export default Task;
