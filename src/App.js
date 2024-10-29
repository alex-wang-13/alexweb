import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import PostList from './components/PostList';
import PostDetails from './components/PostDetails';
import Scrabble from './components/Scrabble';
import Crossword from './components/Crossword';
import Compose from './components/Compose';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div className="container-fluid">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<PostList />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/scrabble" element={<Scrabble />} />
          <Route path="/crossword" element={<Crossword />} />
          <Route path="/compose" element={<Compose />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;