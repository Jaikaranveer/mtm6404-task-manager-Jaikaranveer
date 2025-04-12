import React, { useState, useEffect } from 'react';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Input, Button, Form, Select, message } from 'antd';

const { Option } = Select;

const AddTask = () => {
    const [messageApi, contextHolder] = message.useMessage();

    const [task, setTask] = useState({
        title: '',
        description: '',
        priority: 'low',
        list: ''
    });

    const [taskLists, setTaskLists] = useState([]);

    useEffect(() => {

        const fetchTaskLists = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'taskLists'));
                const lists = querySnapshot.docs.map((doc) => doc.data().name);
                setTaskLists(lists);
                if (lists.length > 0) {
                    setTask((prevTask) => ({ ...prevTask, list: lists[0] }));
                }
            } catch (error) {
                console.error('Error fetching task lists:', error);
            }
        };

        fetchTaskLists();
    }, []);

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

    const handleSubmit = async () => {
        if (!task.title.trim()) return;


        try {
            await addDoc(collection(db, 'tasks'), {
                title: task.title,
                description: task.description,
                priority: task.priority,
                list: task.list,
                createdAt: new Date(),
            });

            messageApi.info('Task added successfully!');


            setTask({
                title: '',
                description: '',
                priority: 'low',
                list: taskLists.length > 0 ? taskLists[0] : '',
            });
        } catch (error) {
            console.error('Error adding task:', error);
            messageApi.info('Failed to add task. Please try again.');

        }
    };

    return (
        <div>
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
        </div>
    );
};

export default AddTask;
