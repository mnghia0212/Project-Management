import Header from "../components/Header";
import { FaPlus } from "react-icons/fa6";
import useTasks from "../hooks/useTasks";
import TaskList from "../components/TaskList";


const Task = () => {
	const { error } = useTasks();

	if (error) return <p>Error: {error.message}</p>;

	return (
		<div className="flex flex-col h-screen">
			<Header tabName="Tasks" />
			{/* Header tasks */}
			<header className="flex justify-between items-center mb-5 px-5">
				{/* Select view mode */}
				<div className="flex gap-5">
					<button>Table</button>
					<button>List View</button>
					</div>

				{/* Button new task */}
				<div>
					<button className="flex items-center px-2 py-1 text-black rounded-sm text-white bg-[var(--primary)] space-x-2">
						<FaPlus className="w-3 h-3 align-middle text-base" />
						<span>New Task</span>
					</button>
				</div>
			</header>

			{/* Task List */}
			<TaskList />
		</div>
	);
};

export default Task;
