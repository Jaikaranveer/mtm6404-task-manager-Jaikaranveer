import React from 'react';
import { Layout } from 'antd';
import Navbar from './components/Navbar';
import AppFooter from './components/Footer';
import Home from './components/Home';

const { Header, Content } = Layout;

const App = () => {
  return (
    <Layout>
      <Header>
        <Navbar />
      </Header>
      <Content style={{ minHeight: '80vh', padding: '20px' }}>
        <Home />
      </Content>
      <AppFooter />
    </Layout>
  );
};

export default App;
