import React, { useEffect, useState } from 'react';
import Layout from '../src/app/layout'; // Import your layout component
import axios from 'axios';
import Link from 'next/link';
import '../src/app/styles.css'; // Import your CSS file

interface SimilarResponsesPageProps {
  history: {
    push: (path: string) => void;
  };
}

const SimilarResponsesPage: React.FC<SimilarResponsesPageProps> = ({ history }) => {
  const [similarResponses, setSimilarResponses] = useState<string[]>([]);

  useEffect(() => {
    // Make an API request to your server to fetch similar responses
    axios.get<string[]>('http://localhost:3001/similarResponses') // Adjust the endpoint as needed
      .then((response) => {
        setSimilarResponses(response.data);
      })
      .catch((error) => {
        console.error('Error fetching similar responses:', error);
      });
  }, []);

  return (
    <Layout> {/* Wrap your content with the Layout component */}
    
      <div className="mt-5 text-center">
        <h1 style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontSize: '32px', fontWeight: 'bold', marginBottom: '20px', marginLeft: '-18%'}}>
        here are some similar responses
        </h1>
        <ul>
          {similarResponses.map((response, index) => (
            <li key={index}>{response}</li>
          ))}
        </ul>
        <Link href="/">
        <h1 style={{ marginLeft: '-18%'}}>
          <a>Go back to Home</a>
        </h1>
        </Link>
      </div>
    </Layout>
  );
};

export default SimilarResponsesPage;
