import React, { useState } from 'react';
import GitUserData from './components/GitUserData';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import the Font Awesome CSS
import './index.css'; // Import the CSS file with Tailwind css style

function App() {
  const [githubUsername, setGithubUsername] = useState(''); // State to hold the GitHub username
  const [showProfile, setShowProfile] = useState(false); // State to control profile visibility
  const [userNotFound, setUserNotFound] = useState(false); // State to track if user is not found

  const handleInputChange = (event) => {
    setGithubUsername(event.target.value); // Update the state with the typed GitHub username
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      searchGithubProfile();
    }
  };

  const searchGithubProfile = () => {
    if (githubUsername.trim() === '') {
      setShowProfile(false); // Set the state to hide the user profile
      setUserNotFound(false); // Reset userNotFound state
      return; // Return to main page if input is empty
    }

    setShowProfile(true);
    setUserNotFound(false); // Reset userNotFound state
  };

  return (
    <div className="App">
      <div className="container">
        <div className="logo-container">
          <img src="/github.png" alt="GitHub Logo" className="github-logo" />
        </div>
        <h1 className="title">Find Github User Profile</h1>
        <div className="input-container">
          <input
            type="text"
            className="input"
            placeholder="Enter GitHub username"
            value={githubUsername}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown} // Add the event listener for Enter key press
          />
        </div>
        {showProfile && !userNotFound && <GitUserData username={githubUsername} />}
        {userNotFound && <div>User not found.</div>}
        <div className="copy-right">
          &copy; {new Date().getFullYear()} Kalousius. All rights reserved.
        </div>
      </div>
    </div>
  );
}

export default App;
