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
        {/* Links */}
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
          <div className="col-md-4 mx-5 d-flex align-items-center">
            <span className="mb-3 mb-md-0 text-muted">© 2024</span>
          </div>

          <ul className="nav col-md-4 align-items-center justify-content-end list-unstyled d-flex">
            <li className="text-muted">
              <div>- follow me -</div>
              <div className="small">icons by icons8</div>
            </li>
            <li className="ms-3"><a className="text-muted" href="https://github.com/alex-wang-13"><img alt="Github Logo" src="images/icons8-github-48.png" /></a></li>
            <li className="ms-3"><a className="text-muted" href="https://www.linkedin.com/in/alex-11303-wang"><img alt="Linkedin Logo" src="images/icons8-linkedin-48.png" /></a></li>
            <li className="ms-3"><a className="text-muted" href="https://letterboxd.com/alexthedawg"><img alt="Letterboxd Logo" src="images/icons8-letterboxd-48.png" /></a></li>
            <li className="ms-3"><a className="text-muted" href="https://www.goodreads.com/user/show/57369610-alex"><img alt="Goodreads Logo" src="images/icons8-goodreads-48.png" /></a></li>
          </ul>
        </footer>
      </div>
    </Router>
  );
}

export default App;