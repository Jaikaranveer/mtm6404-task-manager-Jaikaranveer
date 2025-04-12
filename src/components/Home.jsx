import React from 'react';
import TaskList from './TaskList';

const tasks = [
    { title: 'Finish React project', description: 'Complete Iteration 2 for task manager' },
    { title: 'Study for exam', description: 'Chapters 4 and 5 need review' },
    { title: 'Buy groceries', description: 'Milk, bread, fruit' },
    { title: 'Call mom', description: 'Check in and say hi' },
    { title: 'Clean desk', description: 'Organize workspace before starting next task' }
];

const Home = () => {
    return (
        <div>
            <h2>Task List</h2>
            <TaskList tasks={tasks} />
        </div>
    );
};

export default Home;
