import React, { useState } from 'react';
import './App.css';
import { Cookies } from 'react-cookie';

function App() {
  const [name, setName] = useState<string>('');
  const HOST = window.location.host;
  const cookies = new Cookies();

  const handleSession = async () => {
    const res = await fetch('http://localhost:8080/usersnum', {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Origin: `http://${HOST}`,
      },
      body: JSON.stringify({
        name: name,
      }),
    });

    console.log(res.headers.get('Set-Cookie'));
    const result = await res.json();
    console.log(result);
  };

  console.log(name);
  const handleRemoveSession = async () => {
    cookies.get('connect.sid');
    try {
      await fetch('http://localhost:8080/removeusersnum', {
        method: 'GET',
        credentials: 'include',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Origin: `http://${HOST}`,
        },
      });
      console.log('삭제완료');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='App'>
      <input type='text' onChange={(e) => setName(e.target.value)} />
      <button onClick={handleSession}>App</button>
      <button onClick={handleRemoveSession}>Remove</button>
    </div>
  );
}

export default App;
