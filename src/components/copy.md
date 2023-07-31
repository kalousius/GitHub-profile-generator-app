import React from 'react';
import GitUserData from './components/GitUserData';//import the GitUserData components
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import the Font Awesome CSS
import './index.css'; // Import the CSS file 

function App() {
  const githubUsername = 'Famba-Abdulnassiir  '; // my GitHub username
//add tailwind css on css classess
  return (
    <div className="container mx-auto py-4">
      <h1 className="text-4xl font-bold mb-4">Git User Data</h1>
      <GitUserData username={githubUsername} />
    </div>
  );
}

export default App;


// src/components/GitUserData.js
import React, { useEffect, useState } from 'react';

const GitUserData = ({ username }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [username]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">
        <i className="fas fa-user"></i> {userData.login}
      </h2>
      <p className="text-lg">
        <i className="fas fa-user-circle"></i> Name: {userData.name}
      </p>
      <p className="text-lg">
        <i className="fas fa-map-marker-alt"></i> Location: {userData.location}
      </p>
    </div>
  );
};

export default GitUserData;




<img src={avatar_url} alt="Profile" className="profile-image mb-2" />
      <p>
        <i className="fas fa-users"></i> Followers: {followers}
      </p>
      <p>
        <i className="fas fa-user-friends"></i> Following: {following}
      </p>
      <p>
        <i className="fas fa-code-branch"></i> Repositories: {public_repos}
      </p>
      <p>
        <i className="fas fa-map-marker-alt"></i> Location: {location}
      </p>
      <p>
        <i className="fas fa-clock"></i> Joined Github: {new Date(created_at).toDateString()}
      </p>