import React, { useState } from 'react';
import { Input, Button, Form, Select } from 'antd';

const { Option } = Select;

const AddTask = ({ onAdd }) => {
    const [task, setTask] = useState({ title: '', description: '', priority: 'low' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask((prevTask) => ({ ...prevTask, [name]: value }));
    };

    const handlePriorityChange = (value) => {
        setTask((prevTask) => ({ ...prevTask, priority: value }));
    };

    const handleSubmit = () => {
        onAdd(task); // Pass the new task to the parent component
        setTask({ title: '', description: '', priority: 'low' }); // Reset form
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
            <Form.Item>
                <Button type="primary" onClick={handleSubmit}>
                    Add Task
                </Button>
            </Form.Item>
        </Form>
    );
};

export default AddTask;
