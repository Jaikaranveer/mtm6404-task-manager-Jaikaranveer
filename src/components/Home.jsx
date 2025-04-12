import React, { useState, useEffect } from 'react';
import TaskList from './TaskList';
import AddTask from './AddTask';

const Home = () => {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('all'); // 'all', 'completed', 'incomplete'

    // Load tasks from localStorage when component mounts
    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        setTasks(savedTasks);
    }, []); // Runs only once when component is first loaded

    // Save tasks to localStorage whenever tasks change
    useEffect(() => {
        if (tasks.length > 0) {
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }, [tasks]); // Runs whenever tasks change

    const handleAddTask = (task) => {
        setTasks((prevTasks) => [...prevTasks, { ...task, completed: false }]);
    };

    const handleDeleteTask = (index) => {
        setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
    };

    const handleToggleComplete = (index) => {
        setTasks((prevTasks) =>
            prevTasks.map((task, i) =>
                i === index ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const filteredTasks = tasks.filter((task) => {
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
            <AddTask onAdd={handleAddTask} />
            <div>
                <button style={buttonStyle('all')} onClick={() => setFilter('all')}>
                    Show All
                </button>
                <button style={buttonStyle('completed')} onClick={() => setFilter('completed')}>
                    Show Completed
                </button>
                <button style={buttonStyle('incomplete')} onClick={() => setFilter('incomplete')}>
                    Show Incomplete
                </button>
            </div>
            <TaskList
                tasks={filteredTasks}
                onDelete={handleDeleteTask}
                onToggleComplete={handleToggleComplete}
            />
        </div>
    );
};

export default Home;
