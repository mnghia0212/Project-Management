import { useEffect, useState } from "react";
import { createTask, updateTask, deleteTask } from "../services/taskService";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

export default function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

	  (err) => {
		setError(err);
		setLoading(false);
	  }
    );

    return () => unsubscribe();
  }, []);


  return { tasks, setTasks, loading, setLoading, error, setError };
}
