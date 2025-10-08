import { useEffect, useState } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "../services/taskService";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

export default function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load tasks
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "tasks"),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTasks(data);
        setLoading(false);
      },
    );

    return () => unsubscribe();
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

  return { tasks, setTasks, loading, setLoading, addTask, editTask, removeTask };
}
