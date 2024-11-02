import React, { useState } from 'react';
import { isMobile } from 'react-device-detect';

const Header = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://alexwebserver.onrender.com/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        } catch (error) {
            setIsLoggedIn(false);
        }
    };

    return (
        <nav className="navbar navbar-expand-sm navbar-light bg-light p-3">
            <div className="container-fluid">
                <a className="navbar-brand">AlextheDev</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item"><a className="nav-link" href="/">Home</a></li>
                        <li className="nav-item"><a className="nav-link" href="/posts">Posts</a></li>
                        {!isMobile &&
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Games
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="/anagram">Anagram</a></li>
                                    <li><a className="dropdown-item" href="/crossword">Crossword</a></li>
                                </ul>
                            </li>
                        }
                    </ul>
                    <div className="navbar-nav ms-auto">
                        <a href="/register" className="nav-link">Sign Up</a>
                        <a href="/login" className="nav-link">Login</a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;