import React from 'react';
import { Card, List, Button, Empty } from 'antd';

const TaskList = ({ tasks, onDelete, onToggleComplete }) => {
    if (tasks.length === 0) {
        return <Empty description="No tasks added yet." />;
    }

    return (
        <List
            dataSource={tasks}
            renderItem={(item, index) => (
                <List.Item style={{ width: '100%' }}>
                    <Card
                        title={item.title}
                        style={{ width: '100%', backgroundColor: item.completed ? '#f0f0f0' : '#fff' }}
                    >
                        <p>{item.description}</p>
                        <p>Priority: {item.priority}</p>
                        <div>
                            <Button onClick={() => onToggleComplete(index)}>
                                {item.completed ? 'Mark Incomplete' : 'Mark Complete'}
                            </Button>
                            <Button type="seoondary" onClick={() => onDelete(index)}>
                                Delete
                            </Button>
                        </div>
                    </Card>
                </List.Item>
            )}
        />
    );
};

export default TaskList;
