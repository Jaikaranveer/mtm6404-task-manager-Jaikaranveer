import React, { useState, useEffect } from 'react';
import { Input, Button } from 'antd';
import TaskList from './TaskList';
import AddTask from './AddTask';
import { v4 as uuidv4 } from 'uuid';

const Home = () => {
    const [tasks, setTasks] = useState([]);
    const [taskLists, setTaskLists] = useState([]);
    const [newListName, setNewListName] = useState('');
    const [selectedList, setSelectedList] = useState('');
    const [filter, setFilter] = useState('all');

    // Load from localStorage on mount
    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const savedLists = JSON.parse(localStorage.getItem('taskLists')) || [];
        const savedSelectedList = localStorage.getItem('selectedList') || '';
        setTasks(savedTasks);
        setTaskLists(savedLists);
        setSelectedList(savedSelectedList);
    }, []);

    // Save to localStorage when tasks change
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {
        localStorage.setItem('taskLists', JSON.stringify(taskLists));
    }, [taskLists]);

    useEffect(() => {
        localStorage.setItem('selectedList', selectedList);
    }, [selectedList]);

    const handleAddTask = (task) => {
        const newTask = {
            id: uuidv4(),
            name: task.name,
            completed: false,
            list: selectedList,
        };
        setTasks((prev) => [...prev, newTask]);
    };

    const handleDeleteTask = (id) => {
        setTasks((prev) => prev.filter((task) => task.id !== id));
    };

    const handleToggleComplete = (id) => {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const handleSelectList = (list) => {
        setSelectedList(list);
        setFilter('all'); // reset filter when switching lists
    };

    const handleAddList = () => {
        const trimmedName = newListName.trim();
        if (trimmedName && !taskLists.includes(trimmedName)) {
            setTaskLists((prev) => [...prev, trimmedName]);
            setSelectedList(trimmedName);
            setNewListName('');
        }
    };

    const filteredTasks = tasks.filter((task) => {
        if (task.list !== selectedList) return false;
        if (filter === 'completed') return task.completed;
        if (filter === 'incomplete') return !task.completed;
        return true;
    });

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
                    <AddTask onAdd={handleAddTask} taskLists={taskLists} />
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
