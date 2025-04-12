import React from 'react';
import { Typography } from 'antd';
import TaskList from './TaskList';

const { Title } = Typography;

const Home = () => (
    <div style={{ padding: '20px' }}>
        <Title level={2}>Task List</Title>
        <TaskList />
    </div>
);

export default Home;
