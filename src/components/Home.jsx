import React, { useState, useEffect } from 'react';
import { Input, Button } from 'antd';
import TaskList from './TaskList';
import AddTask from './AddTask';
import { v4 as uuidv4 } from 'uuid';
import {
    getTasks,
    getTaskLists,
    getSelectedList,
    addTask,
    toggleTaskCompletion,
    deleteTask,
    addTaskList,
    setSelectedList
} from '../firebase';

const Home = () => {
    const [tasks, setTasks] = useState([]);
    const [taskLists, setTaskLists] = useState([]);
    const [newListName, setNewListName] = useState('');
    const [selectedList, setSelectedListState] = useState('');
    const [filter, setFilter] = useState('all');


    useEffect(() => {
        const loadData = async () => {
            const fetchedTasks = await getTasks();
            const fetchedLists = await getTaskLists();
            const fetchedSelectedList = await getSelectedList();

            setTasks(fetchedTasks);
            setTaskLists(fetchedLists);
            setSelectedListState(fetchedSelectedList);
        };
        loadData();
    }, []);

    const handleAddTask = async (task) => {
        const newTask = {
            id: uuidv4(),
            title: task.title,
            description: task.description,
            priority: task.priority,
            completed: false,
            list: selectedList,
        };
        await addTask(newTask);
        setTasks((prev) => [...prev, newTask]);
    };

    const handleDeleteTask = async (id) => {
        await deleteTask(id);
        setTasks((prev) => prev.filter((task) => task.id !== id));
    };

    const handleToggleComplete = async (id) => {
        console.log("safsaf", id)
        const taskToUpdate = tasks.find((task) => task.id === id);
        await toggleTaskCompletion(id, !taskToUpdate.completed);
        setTasks((prev) =>
            prev.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const handleSelectList = async (list) => {
        setSelectedListState(list);
        setFilter('all');
        await setSelectedList(list);
    };

    const handleAddList = async () => {
        const trimmedName = newListName.trim();
        if (trimmedName && !taskLists.includes(trimmedName)) {
            await addTaskList(trimmedName);
            setTaskLists((prev) => [...prev, trimmedName]);
            setSelectedListState(trimmedName);
            setNewListName('');
        }
    };

    const priorityOrder = {
        high: 3,
        medium: 2,
        low: 1,
    };

    const filteredTasks = tasks
        .filter((task) => {
            if (task.list !== selectedList) return false;
            if (filter === 'completed') return task.completed;
            if (filter === 'incomplete') return !task.completed;
            return true;
        })
        .sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);

    const buttonStyle = (currentFilter) => ({
        backgroundColor: filter === currentFilter ? '#1890ff' : 'transparent',
        color: filter === currentFilter ? 'white' : 'black',
        border: '1px solid #1890ff',
        padding: '5px 10px',
        cursor: 'pointer',
        margin: '5px',
    });

    return (
        <div>
            {/* Add List */}
            <div style={{ margin: '10px 0' }}>
                <Input
                    placeholder="New List Name"
                    value={newListName}
                    onChange={(e) => setNewListName(e.target.value)}
                    style={{ width: 200, marginRight: '10px' }}
                />
                <Button onClick={handleAddList} type="primary">Add List</Button>
            </div>

            {/* List Buttons */}
            <div style={{ marginBottom: '10px' }}>
                {taskLists.map((list) => (
                    <Button
                        key={list}
                        onClick={() => handleSelectList(list)}
                        type={selectedList === list ? 'primary' : 'default'}
                        style={{ marginRight: '10px' }}
                    >
                        {list}
                    </Button>
                ))}
            </div>

            {selectedList && (
                <>
                    <div>
                        <Button style={buttonStyle('all')} onClick={() => setFilter('all')}>Show All</Button>
                        <Button style={buttonStyle('completed')} onClick={() => setFilter('completed')}>Show Completed</Button>
                        <Button style={buttonStyle('incomplete')} onClick={() => setFilter('incomplete')}>Show Incomplete</Button>
                    </div>
                    {/* <AddTask onAdd={handleAddTask} taskLists={taskLists} /> */}
                    <TaskList
                        tasks={filteredTasks}
                        onDelete={handleDeleteTask}
                        onToggleComplete={handleToggleComplete}
                    />
                </>
            )}
        </div>
    );
};

export default Home;
