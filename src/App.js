import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import PostList from './components/PostList';
import PostDetails from './components/PostDetails';
import Anagram from './components/Anagram';
import Crossword from './components/Crossword';
import Compose from './components/Compose';
import Form from './components/Form';
import Profile from './components/Profile';
import Board from './components/Board';

const Layout = () => {
  const location = useLocation();

  return (
    <div className="container-fluid">
      {/* Conditionally render Header */}
      {location.pathname !== '/board' && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<PostList />} />
        <Route path="/posts/:id" element={<PostDetails />} />
        <Route path="/anagram" element={<Anagram />} />
        <Route path="/crossword" element={<Crossword />} />
        <Route path="/compose" element={<Compose />} />
        <Route path="/register" element={<Form action="Register" />} />
        <Route path="/login" element={<Form action="Login" />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/board" element={<Board />} />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;