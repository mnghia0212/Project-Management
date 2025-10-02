import React, { useState } from "react";
import useTasks from "../hooks/useTasks";
import toast from "react-hot-toast";

const QuickTaskForm = ({ showModal, setShowModal }) => {
	const { addTask, loading } = useTasks();	
    const [form, setForm] = useState({
        title: "",
        description: "",
        status: "todo",
        priority: "medium",
        dueDate: "",
        assigneeIds: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
		try {
			await addTask(form);
			setForm({
				title: "",
				description: "",
				status: "todo",
				priority: "medium",
				dueDate: "",
				assigneeIds: "",
			});
			setShowModal(false);
			toast.success("Task added successfully!");
		} catch (error) {
			toast.error(`Failed to add task: ${error.message}`);
		}
    };

    return (
        <form
            className="bg-white space-y-6"
            onSubmit={handleSubmit}
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label
                        htmlFor="title"
                        className="text-sm font-semibold text-gray-700 flex items-center gap-1"
                    >
                        Task Title <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        required
                        className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
                        placeholder="Enter task title"
                    />
                </div>
                <div>
                    <label
                        htmlFor="dueDate"
                        className="text-sm font-semibold text-gray-700 flex items-center gap-1"
                    >
                        Due Date
                    </label>
                    <input
                        type="date"
                        id="dueDate"
                        name="dueDate"
                        value={form.dueDate}
                        onChange={handleChange}
                        className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
                    />
                </div>
                <div>
                    <label
                        htmlFor="status"
                        className="text-sm font-semibold text-gray-700"
                    >
                        Status
                    </label>
                    <select
                        id="status"
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                        className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
                    >
                        <option value="todo">Open</option>
                        <option value="working">Working</option>
                        <option value="review">Review</option>
                        <option value="done">Done</option>
                    </select>
                </div>
                <div>
                    <label
                        htmlFor="priority"
                        className="text-sm font-semibold text-gray-700"
                    >
                        Priority
                    </label>
                    <select
                        id="priority"
                        name="priority"
                        value={form.priority}
                        onChange={handleChange}
                        className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>
            </div>
            <div>
                <label
                    htmlFor="description"
                    className="text-sm font-semibold text-gray-700"
                >
                    Description
                </label>
                <textarea
                    id="description"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
                    placeholder="Enter task description"
                    rows="3"
                ></textarea>
            </div>
            <div>
                <label
                    htmlFor="assigneeIds"
                    className="text-sm font-semibold text-gray-700"
                >
                    Assignee
                </label>
                <select
                    id="assigneeIds"
                    name="assigneeIds"
                    value={form.assigneeIds}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
                >
                    <option value="">Select assignee</option>
                    {/* Thêm options động ở đây nếu có */}
                </select>
            </div>
            <div className="flex justify-end pt-2">
                <button
                    type="submit"
                    className="bg-[var(--primary)] hover:bg-[var(--hover)] text-white font-semibold px-6 py-2 rounded-lg shadow transition"
                >
                    Add Task
                </button>
            </div>
        </form>
    );
};

export default QuickTaskForm;
