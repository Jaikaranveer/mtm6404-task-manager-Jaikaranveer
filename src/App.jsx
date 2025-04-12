import './App.css'
import React from 'react';
import { Layout } from 'antd';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AppFooter from './components/Footer';
import Home from './components/Home';
import Wrapper from './components/Wrapper';

const { Header, Content } = Layout;

const App = () => {
  return (
    <Router>
      <Layout>
        <Header style={{ padding: 0 }}>
          <Navbar />
        </Header>
        <Content style={{ minHeight: '80vh' }}>
          <Wrapper>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<p>About Page</p>} />
              <Route path="/contact" element={<p>Contact Page</p>} />
            </Routes>
          </Wrapper>
        </Content>
        <AppFooter />
      </Layout>
    </Router>
  );
};

export default App;
