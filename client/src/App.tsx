import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState<string>('');
  const [pwd, setPwd] = useState<string>('');
  const [ip, setIp] = useState<string>('');
  const HOST = window.location.host;

  useEffect(() => {
    const getIp = async () => {
      const ipData = await fetch('https://geolocation-db.com/json/');
      const locationIp = await ipData.json();
      setIp(locationIp.IPv4);
    };
    getIp();
  }, []);

  const handleSession = async () => {
    const res = await fetch('http://localhost:8080/api/auth/signin', {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Origin: `http://${HOST}`,
        ip,
      },
      body: JSON.stringify({
        name,
        password: pwd,
      }),
    });

    console.log(res.headers.get('Set-Cookie'));
    const result = await res.json();
    console.log(result);
  };

  console.log(ip);

  return (
    <div className='App'>
      <input type='text' onChange={(e) => setName(e.target.value)} />
      <input type='password' onChange={(e) => setPwd(e.target.value)} />
      <button onClick={handleSession}>App</button>
      <button>Remove</button>
    </div>
  );
}

export default App;
