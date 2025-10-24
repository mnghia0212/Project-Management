import { db } from "../firebase";
import { collection, doc, getDoc, getDocs, setDoc, updateDoc, deleteDoc, serverTimestamp } from "firebase/firestore";

const usersCol = collection(db, "users");

export const addUser = async (userData) => {
const docRef = doc(db, "users", userData.id);
	await setDoc(docRef, { 
		...userData,
  	});
};

export const getUsers = async () => {
  const snapshot = await getDocs(usersCol);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const getUserByUid = async (id) => {
  const docSnap = await getDoc(doc(db, "users", id));
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
};

export const getAssignableUsers  = async (currentUserId) => {
  const allUsers = await getUsers();
  return allUsers.filter(user => user.id !== currentUserId);
}

export const updateUser = async (id, updates) => {
  await updateDoc(doc(db, "users", id), {
	...updates,
	updatedAt: serverTimestamp(),
  });
};

export const deleteUser = async (id) => {
  await deleteDoc(doc(db, "users", id));
};

export const getAssigneeOptions = async () => {
  const users = await getUsers();
  return users.filter(user => user.role != 'admin');
}
