import Header from "../components/Header";
import { FaPlus } from "react-icons/fa6";
import useTasks from "../hooks/useTasks";

const taskStatus = ["open", "working", "review", "done"];

const Task = () => {
	const { loading, error, tasks } = useTasks();

	const filterTasksByStatus = (status) => {
		return tasks.filter((task) => task.status === status);
	}

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error.message}</p>;

	return (
		<div className="flex flex-col min-h-screen">
			<Header tabName="Tasks" />
			{/* Header tasks */}
			<header className="flex justify-between items-center mb-5 px-5">
				{/* Select view mode */}
				<div className="flex gap-5">
					<button>Table</button>
					<button>List View</button>
					<button>Kanban</button>
				</div>

				{/* Display Member */}
				<div className="flex gap-2">
					<div className="w-10 h-10 rounded-full bg-blue-400"></div>
					<div className="w-10 h-10 rounded-full bg-blue-400"></div>
					<div className="w-10 h-10 rounded-full bg-blue-400"></div>
					<div className="w-10 h-10 rounded-full bg-blue-400"></div>
					<div className="w-10 h-10 rounded-full bg-blue-400"></div>
					<div className="w-10 h-10 rounded-full bg-blue-400 flex justify-center items-center text-xs">
						+40
					</div>

					<div className="border-l border-gray-700" />

					<button className="flex items-center bg-gray-200 text-black p-3 rounded-full">
						<FaPlus className="w-4 h-4 inline-block" />
					</button>
				</div>
			</header>

			{/* Task List By Status */}
			<div className="flex-1 grid grid-cols-4 gap-4 bg-[var(--surface)] p-4 rounded">
				{taskStatus.map((status) => {
					const tasksByStatus = filterTasksByStatus(status);
					console.log(status, tasksByStatus);
					
					return (
						<div key={status} className="bg-white p-4 rounded shadow h-70">
							<h2 className="font-bold mb-2">{status.toUpperCase()} ({tasksByStatus.length})</h2>
							<div className="space-y-2">
								{tasksByStatus.map((task) => (
									<div key={task.id} className="bg-gray-100 p-2 rounded shadow">
										<h3 className="font-semibold">{task.title}</h3>
										<p className="text-sm text-gray-600">{task.description}</p>
									</div>
								))}
							</div>
						</div>
					);		
				})}
			</div>
		</div>
	);
};

export default Task;
