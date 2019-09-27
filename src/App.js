import React from 'react';
import './App.css';
import { Container, MuiThemeProvider } from '@material-ui/core';
import Footer from './components/Footer';
import Header from './components/Header';
import theme from './theme/muiTheme';

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <Container className="main" maxWidth="md">
          <Header></Header>
          content
        <Footer></Footer>
        </Container>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
