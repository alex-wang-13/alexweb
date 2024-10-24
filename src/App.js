import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import PostList from './components/PostList';
import PostDetails from './components/PostDetails';
import Scrabble from './components/Scrabble';
import Crossword from './components/Crossword';
import Compose from './components/Compose';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div className="container-fluid">
        <nav className="navbar navbar-expand-sm navbar-light bg-light">
          <a className="navbar-brand" href="/">MyApp</a>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav">
              <li className="nav-item"><a className="nav-link" href="/">Home</a></li>
              <li className="nav-item"><a className="nav-link" href="/posts">Posts</a></li>
              <li className="nav-item"><a className="nav-link" href="/scrabble">Scrabble</a></li>
              <li className="nav-item"><a className="nav-link" href="/crossword">Crossword</a></li>
            </ul>
          </div>
        </nav>
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