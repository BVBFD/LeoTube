import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  console.log(process.env.REACT_APP_DOT_ENV_TEST);

  return (
    <div className='App'>
      <span>App</span>
    </div>
  );
}

export default App;
