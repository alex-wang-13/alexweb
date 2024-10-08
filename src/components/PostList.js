import React, { useState, useEffect } from 'react';

const PostList = () => {
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch('http://localhost:5000/posts');
        const data = await response.json();
        setBlogPosts(data);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      }
    };

    fetchBlogPosts();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Blog Posts</h2>
      {blogPosts.length === 0 ? (
        <p>No blog posts available</p>
      ) : (
        <ul className="list-group">
          {blogPosts.map((post) => (
            <li key={post._id} className="list-group-item">
              <h4>{post.title}</h4>
              <p className="small">{post.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PostList;