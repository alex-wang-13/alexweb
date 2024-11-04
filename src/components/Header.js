import React, { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';

const Header = () => {
    const [profile, setProfile] = useState([]);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                console.log(token)
                const response = await fetch('https://alexwebserver.onrender.com/auth/profile', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`, // Add token to header
                        'Content-Type': 'application/json'
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setProfile(data);
                } else {
                    setProfile([]);
                }
            } catch (error) {
                setProfile([]);
            }
        }

        fetchProfile();
    }, []);

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
                    {profile.username ? (
                        <div className="navbar-nav ms-auto">
                            <a href="/" className="nav-link">{'Welcome, ' + profile.username}</a>
                        </div>
                    ) : (
                        < div className="navbar-nav ms-auto">
                            <a href="/register" className="nav-link">Sign Up</a>
                            <a href="/login" className="nav-link">Login</a>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Header;