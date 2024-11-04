import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../AppContext';

const Form = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const {setProfileData} = useAppContext();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username || !password) {
            setError('Please fill out all fields');
        } else {
            setError('');

            try {
                const response = await fetch(`https://alexwebserver.onrender.com/auth/${props.action.toLowerCase()}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, password }),
                });
                const data = await response.json();
                if (response.ok) {
                    if (props.action === 'Login') {
                        localStorage.setItem('token', data.token);
                        setProfileData(data);
                        navigate('/'); // Go to home
                    }
                    if (props.action === 'Register')
                        navigate('/login');
                } else {
                    setError(`${props.action} failed.`);
                }
            } catch (error) {
                setError(`${props.action} failed.`);
            }
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <h2 className="text-center text-capitalized">{props.action}</h2>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn w-100 fw-bold"
                            style={{ backgroundColor: '#32a852', color: 'white' }}
                        >
                            {props.action}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Form;