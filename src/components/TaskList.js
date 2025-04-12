import React from 'react';
import { List, Card } from 'antd';

const tasks = [
    {
        title: 'Call John',
        description: 'Discuss the new project proposal.',
    },
    {
        title: 'Email Sarah',
        description: 'Send her the final report.',
    },
    {
        title: 'Meeting with UX Team',
        description: 'Review wireframes and feedback.',
    },
];

const TaskList = () => (
    <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={tasks}
        renderItem={(item) => (
            <List.Item>
                <Card title={item.title}>{item.description}</Card>
            </List.Item>
        )}
    />
);

export default TaskList;
