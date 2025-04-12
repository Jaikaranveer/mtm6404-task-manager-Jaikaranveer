import React from 'react';
import { Menu } from 'antd';

const Navbar = () => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 20px',
            backgroundColor: '#001529'
        }}>
            {/* Site Name / Logo */}
            <div style={{ color: 'white', fontSize: '18px', fontWeight: 'bold' }}>
                Jashan Task Book
            </div>

            {/* Menu Items */}
            <Menu mode="horizontal" theme="dark" style={{ backgroundColor: 'transparent' }}>
                <Menu.Item key="home">Home</Menu.Item>
                <Menu.Item key="add">Add Task</Menu.Item>
                <Menu.Item key="about">About</Menu.Item>
                <Menu.Item key="contact">Contact</Menu.Item>
            </Menu>
        </div>
    );
};

export default Navbar;
