import React, { useEffect, useState } from 'react';

const GitUserData = ({ username }) => {
  const [userData, setUserData] = useState(null);
  const [repositories, setRepositories] = useState([]);
  const [topLanguages, setTopLanguages] = useState([]);

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

    const fetchRepositories = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${username}/repos`);
        if (!response.ok) {
          throw new Error('Failed to fetch repositories');
        }
        const repositoriesData = await response.json();
        setRepositories(repositoriesData);
      } catch (error) {
        console.error('Error fetching repositories:', error);
      }
    };

    fetchUserData();
    fetchRepositories();
  }, [username]);

  useEffect(() => {
    // Calculate the top languages from the repositories
    const languagesMap = new Map();
    repositories.forEach((repo) => {
      if (repo.language) {
        if (languagesMap.has(repo.language)) {
          languagesMap.set(repo.language, languagesMap.get(repo.language) + 1);
        } else {
          languagesMap.set(repo.language, 1);
        }
      }
    });

    // Sort the languages by frequency
    const sortedLanguages = Array.from(languagesMap.entries()).sort((a, b) => b[1] - a[1]);

    // Get the top 5 languages
    const topLanguages = sortedLanguages.slice(0, 5).map((entry) => entry[0]);
    setTopLanguages(topLanguages);
    
  }, [repositories]);

  if (!userData || repositories.length === 0) {
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

      <div className="top-languages">
        <p>
          <strong>Top Languages:</strong> {topLanguages.join(', ')}
        </p>
      </div>

      <h3 className="text-lg font-bold mb-2">Repositories:</h3>
     <ul className="repositories-list">
  {repositories.map((repo) => (
    <li key={repo.id} className="repository-item">
      <div className="repository-info">
        <h3 className="repository-name">
          <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
            {repo.name}
          </a>
        </h3>
        {repo.description && <p className="repository-description">{repo.description}</p>}
        <p className="repository-details">
          <span>
            <i className="fas fa-star"></i> Stars: {repo.stargazers_count}
          </span>
          <span>
            <i className="fas fa-code-branch"></i> Forks: {repo.forks_count}
          </span>
          <span>
            <i className="fas fa-eye"></i> Watchers: {repo.watchers_count}
          </span>
        </p>
      </div>
    </li>
  ))}
</ul>

    </div>
  );
};

export default GitUserData;
