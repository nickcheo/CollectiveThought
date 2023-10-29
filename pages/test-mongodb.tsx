// pages/test-mongodb.tsx

import { useEffect, useState } from 'react';

function TestMongoDB() {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/test-mongodb')
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message);
      })
      .catch((error) => {
        console.error('Error:', error);
        setMessage('Failed to connect to MongoDB.');
      });
  }, []);

  return (
    <div>
      <h1>Testing MongoDB Connection</h1>
      {message ? <p>{message}</p> : <p>Connecting to MongoDB...</p>}
    </div>
  );
}

export default TestMongoDB;
