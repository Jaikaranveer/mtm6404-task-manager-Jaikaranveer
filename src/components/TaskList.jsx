import React from 'react';
import { Card, List, Empty } from 'antd';

const TaskList = ({ tasks }) => {
    if (tasks.length === 0) {
        return <Empty description="No tasks added yet." />;
    }

    return (
        <List
            dataSource={tasks}
            renderItem={(item) => (
                <List.Item style={{ width: '100%' }}>
                    <Card title={item.title} style={{ width: '100%' }}>
                        {item.description}
                    </Card>
                </List.Item>
            )}
        />
    );
};

export default TaskList;
