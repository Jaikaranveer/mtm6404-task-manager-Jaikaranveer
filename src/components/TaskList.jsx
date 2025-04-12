import React from 'react';
import { List, Checkbox, Button } from 'antd';

const TaskList = ({ tasks, onDelete, onToggleComplete }) => {
    return (
        <List
            bordered
            dataSource={tasks}
            renderItem={(task) => (
                <List.Item
                    actions={[
                        <Button danger onClick={() => onDelete(task.id)}>Delete</Button>
                    ]}
                >
                    <Checkbox
                        checked={task.completed}
                        onChange={() => onToggleComplete(task.id)}
                    >
                        <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                            {task.name}
                        </span>
                    </Checkbox>
                </List.Item>
            )}
        />
    );
};

export default TaskList;
