import React, { useState } from 'react';
import GitUserData from './components/GitUserData';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import the Font Awesome CSS
import './index.css'; // Import the CSS file
function App() {
  const [githubUsername, setGithubUsername] = useState(''); // State to hold the GitHub username

  const handleInputChange = (event) => {
    setGithubUsername(event.target.value); // Update the state with the typed GitHub username
  };

  return (
    <div className="bg-blue-200 min-h-screen flex items-center justify-center">
      <div className="container mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold mb-4">Git User Data</h1>
        <div className="mb-4">
          <input
            type="text"
            className="border rounded p-2 w-full"
            placeholder="Enter GitHub username"
            value={githubUsername}
            onChange={handleInputChange}
          />
        </div>
        {githubUsername && <GitUserData username={githubUsername} />}
      </div>
    </div>
  );
}

export default App;
