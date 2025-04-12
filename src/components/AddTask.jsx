import React, { useState, useEffect } from 'react';
import { Input, Button, Form, Select } from 'antd';

const { Option } = Select;

const AddTask = ({ onAdd, taskLists = [] }) => {
    // Ensure taskLists is an array even if it's undefined or null
    const [task, setTask] = useState({
        title: '',
        description: '',
        priority: 'low',
        list: taskLists.length > 0 ? taskLists[0] : '' // Default to the first list if available
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask((prevTask) => ({ ...prevTask, [name]: value }));
    };

    const handlePriorityChange = (value) => {
        setTask((prevTask) => ({ ...prevTask, priority: value }));
    };

    const handleListChange = (value) => {
        setTask((prevTask) => ({ ...prevTask, list: value }));
    };

    const handleSubmit = () => {
        if (!task.title.trim()) return;
        onAdd(task);
        setTask({
            title: '',
            description: '',
            priority: 'low',
            list: taskLists.length > 0 ? taskLists[0] : '' // Reset to the first list
        });
    };

    return (
        <Form layout="inline" style={{ marginBottom: '20px' }}>
            <Form.Item>
                <Input
                    placeholder="Task Title"
                    name="title"
                    value={task.title}
                    onChange={handleChange}
                />
            </Form.Item>
            <Form.Item>
                <Input
                    placeholder="Task Description"
                    name="description"
                    value={task.description}
                    onChange={handleChange}
                />
            </Form.Item>
            <Form.Item>
                <Select
                    value={task.priority}
                    onChange={handlePriorityChange}
                    style={{ width: 120 }}
                >
                    <Option value="low">Low</Option>
                    <Option value="medium">Medium</Option>
                    <Option value="high">High</Option>
                </Select>
            </Form.Item>

            {/* List Selection */}
            <Form.Item>
                <Select
                    value={task.list}
                    onChange={handleListChange}
                    style={{ width: 120 }}
                >
                    {taskLists.map((list) => (
                        <Option key={list} value={list}>
                            {list}
                        </Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item>
                <Button type="primary" onClick={handleSubmit}>
                    Add Task
                </Button>
            </Form.Item>
        </Form>
    );
};

export default AddTask;
