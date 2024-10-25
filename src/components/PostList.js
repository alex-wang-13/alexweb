import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const PostList = () => {
  const [postList, setPostList] = useState([]);
  const [plainDate, setPlainDate] = useState([]);

  useEffect(() => {
    const fetchPostList = async () => {
      try {
        const response = await fetch('https://alexwebserver.onrender.com/posts');
        const data = await response.json();
        const date = new Date(data[0].date).toUTCString().substring(0, 16);
        setPostList(data);
        setPlainDate(date);
      } catch (error) {
        console.error('Error fetching post list:', error);
      }
    };

    fetchPostList();
  }, []);

  return (
    <div className="container mt-5">
      <h1>Posts</h1>
      {postList.length === 0 ? (
        <p className="text-center py-5 my-5">No posts available</p>
      ) : (
        <ul className="list-group my-4">
          {postList.map((post) => (
            <li key={post._id} className="list-group-item">
              <Link to={`/posts/${post._id}`} style={{ color: "inherit", textDecoration: "inherit" }}>
                <h3>{post.title}</h3>
                <p className="small text-muted">{plainDate}</p>
                <p className="fs-6 text-muted text-truncate">{post.content}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PostList;