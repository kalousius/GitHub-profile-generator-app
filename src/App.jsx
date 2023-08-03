import React, { useState } from 'react';
import GitUserData from './components/GitUserData';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import the Font Awesome CSS
import './index.css'; // Import the CSS file with Tailwind css style

function App() {
  const [githubUsername, setGithubUsername] = useState(''); // State to hold the GitHub username
  const [showProfile, setShowProfile] = useState(false); // State to control profile visibility

  const handleInputChange = (event) => {
    setGithubUsername(event.target.value); // Update the state with the typed GitHub username
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowProfile(true); // Set the state to show the user profile
  };

  return (
    <div className="App">
      <div className="container">
        <div className="logo-container">
          <img src="/github.png" alt="GitHub Logo" className="github-logo" />
        </div>
        <h1 className="title">Find Github User Profile</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              type="text"
              className="input"
              placeholder="Enter GitHub username"
              value={githubUsername}
              onChange={handleInputChange}
            /> <br/> <br/>
            <button type="submit" className="submit-button">
              Find
            </button>
          </div>
        </form>
        {showProfile && <GitUserData username={githubUsername} />}
        <div className="copy-right">
          &copy; {new Date().getFullYear()} Kalousius. All rights reserved.
        </div>
      </div>
    </div>
  );
}

export default App;
