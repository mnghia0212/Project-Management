import { useEffect, useState } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "../services/taskService";

export default function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load tasks
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    const data = await getTasks();
    setTasks(data);
    setLoading(false);
  };

  const addTask = async (task) => {
    await createTask(task);
    fetchTasks();
  };

  const editTask = async (id, updates) => {
    await updateTask(id, updates);
    fetchTasks();
  };

  const removeTask = async (id) => {
    await deleteTask(id);
    fetchTasks();
  };

  return { tasks, loading, addTask, editTask, removeTask };
}
