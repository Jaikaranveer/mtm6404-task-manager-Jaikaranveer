// Import the required Firebase components from the modular SDK
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc, doc, updateDoc, deleteDoc, getDoc, setDoc } from 'firebase/firestore';

// Your Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyCr85YaxqZfImLXTG4OBu_HjO5nquyN69k",
    authDomain: "jashan-bca0b.firebaseapp.com",
    projectId: "jashan-bca0b",
    storageBucket: "jashan-bca0b.firebasestorage.app",
    messagingSenderId: "1023729433825",
    appId: "1:1023729433825:web:2fc856331cdd568fc04ba0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Function to get all tasks
export const getTasks = async () => {
    const tasksSnapshot = await getDocs(collection(db, 'tasks'));
    const tasks = tasksSnapshot.docs.map(doc => ({
        id: doc.id,           // ✅ include Firestore doc ID here
        ...doc.data()
    }));
    return tasks
};

// Function to get task lists
export const getTaskLists = async () => {
    const listsSnapshot = await getDocs(collection(db, 'taskLists'));
    return listsSnapshot.docs.map(doc => doc.data().name);
};

// Function to get the selected list
export const getSelectedList = async () => {
    const docRef = doc(db, 'selectedList', 'currentList');
    const docSnapshot = await getDoc(docRef);
    return docSnapshot.exists() ? docSnapshot.data().name : '';
};

// Function to add a task
export const addTask = async (task) => {
    await addDoc(collection(db, 'tasks'), task);
};

// Function to update task completion status
export const toggleTaskCompletion = async (taskId, completed) => {
    const taskRef = doc(db, 'tasks', taskId);
    await updateDoc(taskRef, { completed });
};

// Function to delete a task
export const deleteTask = async (taskId) => {
    const taskRef = doc(db, 'tasks', taskId);
    await deleteDoc(taskRef);
};

// Function to add a task list
export const addTaskList = async (listName) => {
    await addDoc(collection(db, 'taskLists'), { name: listName });
};

// Function to set the selected list
export const setSelectedList = async (listName) => {
    const docRef = doc(db, 'selectedList', 'currentList');
    await setDoc(docRef, { name: listName });
};

export { db };
