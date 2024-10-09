import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const PostList = () => {
  const [postList, setPostList] = useState([]);
  const [plainDate, setPlainDate] = useState([]);

  useEffect(() => {
    const fetchPostList = async () => {
      try {
        const response = await fetch('http://localhost:5000/posts');
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
      <h2>Posts</h2>
      {postList.length === 0 ? (
        <p>No posts available</p>
      ) : (
        <ul className="list-group">
          {postList.map((post) => (
            <li key={post._id} className="list-group-item">
              <Link to={`/posts/${post._id}`} style={{ color: "inherit", textDecoration: "inherit" }}>
                <h3>{post.title}</h3>
                <p className="small text-muted">{plainDate}</p>
                {post.content.length > 100 ? (
                  <p className="fs-6 text-muted">{post.content.substring(0, 100)}...</p>
                ) : (
                  <p className="fs-6 text-muted">{post.content}</p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PostList;