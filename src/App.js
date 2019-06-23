import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './components/pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <Home />
    </div>
  );
}

export default App;
