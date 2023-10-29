import React, { useState } from 'react';
import Layout from '../src/app/layout';
import axios from 'axios'; // You may need to install axios if you haven't already
import questionData from '../questions.json'; // Import your JSON file here

// Define a type for the expected response
type SaveResponse = string;


const getRandomQuestion = () => {
  const { questions } = questionData; // Assuming your JSON structure has a 'questions' property
  const randomIndex = Math.floor(Math.random() * questions.length);
  return questions[randomIndex];
};

const IndexPage: React.FC = () => {
  const [randomQuestion, setRandomQuestion] = useState<string>(getRandomQuestion());
  const [response, setResponse] = useState<string>('');
  const [savedResponses, setSavedResponses] = useState<any[]>([]);


  const handleRefreshQuestion = () => {
    setRandomQuestion(getRandomQuestion());
  };

  const handleResponseChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setResponse(event.target.value);
  };

  const handleSaveResponse = async () => {
    try {
      const responseObj: { response: string } = { response };
      const responseFromServer = await axios.post<string>('http://localhost:3001/saveResponse', responseObj);
      const savedResponse: SaveResponse = responseFromServer.data;
      setSavedResponses([...savedResponses, savedResponse]);
      setResponse('');
    } catch (error) {
      console.error('Error saving response:', error);
    }
  };

  return (
    <Layout>
      <div className="bg-black text-light d-flex flex-column justify-content-center align-items-center" style={{ height: '70vh' }}>
        <div className="mt-8 text-center">
          <h1 style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontSize: '32px', fontWeight: 'bold', marginBottom: '20px' }}>
            {randomQuestion}
          </h1>
          <input
            type="text"
            placeholder="Enter your response"
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
          <button onClick={handleSaveResponse}>Save Response</button>
          <div>
            <h2>Saved Responses:</h2>
            <ul>
            {savedResponses.map((savedResponse, index) => (
  <li key={index}>{typeof savedResponse === 'object' ? savedResponse.data : savedResponse}</li>
))}

            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;
