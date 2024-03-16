import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './GithubList.css';

const GithubList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);


  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(` https://api.github.com/users`);
        setUsers(prevUsers => [...prevUsers, ...response.data]);
      } catch (error) {
        setError(error.message);
      }

      setLoading(false);
    };

    loadUsers();
  }, [page]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter(user =>
    user.login.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleScroll = () => {
    const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight;
    if (bottom) {
      setPage(prevPage => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      <input type="text" placeholder="Search" value={searchTerm} onChange={handleSearch} />
      {loading && <p>Loading...</p>}
      {error && <p>Error {error}</p>}
      <ul>
        {filteredUsers.map(user => (
          <li key={user.id}>
            <img src={user.avatar_url} alt={`${user.login} avatar`} />
            <p>Username  {user.login}</p>
            <p>Follower count {user.followers}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GithubList;
