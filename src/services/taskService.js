import { db } from "../firebase"
import { collection, addDoc, getDoc, getDocs, updateDoc, deleteDoc, doc, serverTimestamp } from "firebase/firestore"

const taskCol = collection(db, "tasks")

export const createTask = async (task) => {	
	return await addDoc(taskCol, { 
		...task,
		createdAt: serverTimestamp(),
		updatedAt: serverTimestamp(),
  	});
};

export const getTasks = async () => {
  const snapshot = await getDocs(taskCol);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const getTaskById = async (id) => {
  const docSnap = await getDoc(doc(db, "tasks", id));
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
};

export const getChildableTasks = async (parentTaskId) => {
  const allTasks = await getTasks();
  return allTasks.filter(task => task.id !== parentTaskId);
}

export const updateTask = async (id, updates) => {
  await updateDoc(doc(db, "tasks", id), {
    ...updates,
    updatedAt: serverTimestamp(),
  });
};

export const deleteTask = async (id) => {
  await deleteDoc(doc(db, "tasks", id));
};