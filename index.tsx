// pages/indexPage.tsx
import React, { useState } from 'react';
import Layout from '../src/app/layout';
import axios from 'axios';
import questionData from '../questions.json';
import { useRouter } from 'next/router'; // Import the useRouter
import Link from 'next/link'; // Import the Link component

// Define a type for the expected response
type SaveResponse = string;

const api = axios.create({
  baseURL: 'http://localhost:3001', // Set the base URL to your server
});

const getRandomQuestion = () => {
  const { questions } = questionData;
  const randomIndex = Math.floor(Math.random() * questions.length);
  return questions[randomIndex];
};

const IndexPage: React.FC = () => {
  const router = useRouter(); // Initialize the router
  const [randomQuestion, setRandomQuestion] = useState<string>(getRandomQuestion());
  const [response, setResponse] = useState<string>('');

  const handleRefreshQuestion = () => {
    setRandomQuestion(getRandomQuestion());
  };

  const handleResponseChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setResponse(event.target.value);
  };

  const handleSaveResponse = () => {
    const responseObj: { response: string } = { response };
    api.post('/saveResponse', responseObj)
      .then((response) => {
        console.log('Response saved successfully:', response);
        // Navigate to the SimilarResponsesPage
        router.push('/similarResponses'); // This will trigger the route change
      })
      .catch((error) => {
        console.error('Error saving response:', error);
      });

    // Clear the response input field
    setResponse('');
  };

  return (
    <Layout>
      <div className="bg-black text-light d-flex flex-column justify-content-center align-items-center" style={{ height: '60vh', textAlign: 'left', marginLeft: '-18%' }}>
        <div className="mt-8 text-center">
          <h1 style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontSize: '32px', fontWeight: 'bold', marginBottom: '20px' }}>
            {randomQuestion}
          </h1>
          <input
            type="text"
            placeholder="enter your response"
            value={response}
            onChange={handleResponseChange}
            style={{
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontSize: '16px',
              padding: '10px',
              border: '2px solid white',
              borderRadius: '20px',
              backgroundColor: 'black',
              color: 'white',
            }}
            className="response-input"
          />
          <Link href="/similarResponses">
        <a className="btn btn-black btn-lg">&#8594; </a>
            
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;
