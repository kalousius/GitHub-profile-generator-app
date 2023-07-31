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

  const { login, avatar_url, followers, following, public_repos, location, created_at, html_url } = userData;

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">
        <a href={html_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
          <i className="fas fa-user"></i> {login}
        </a>
      </h2>
      <div className="profile-image-container">
  <img src={avatar_url} alt="Profile" className="profile-image" />
</div>

<div className="git-user-info">
  <p>
    <i className="fas fa-users"></i> Followers: {followers}
  </p>
</div>

<div className="git-user-info">
  <p>
    <i className="fas fa-user-friends"></i> Following: {following}
  </p>
</div>

<div className="git-user-info">
  <p>
    <i className="fas fa-code-branch"></i> Repositories: {public_repos}
  </p>
</div>

<div className="git-user-info location">
  <p>
    <i className="fas fa-map-marker-alt"></i> Location: {location}
  </p>
</div>

<div className="git-user-info joined">
  <p>
    <i className="fas fa-clock"></i> Joined Github: {new Date(created_at).toDateString()}
  </p>
</div>

    </div>
  );
};

export default GitUserData;
