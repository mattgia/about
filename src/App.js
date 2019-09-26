import React from 'react';
import './App.css';
import { Container } from '@material-ui/core';
import Footer from './components/Footer';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <Container className="main" maxWidth="md">
      <Header></Header>
        content
        <Footer></Footer>
      </Container>
    </div>
  );
}

export default App;
