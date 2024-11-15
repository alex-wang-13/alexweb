import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AppProvider } from './AppContext';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <AppProvider>
            <App />
        </AppProvider>
    </React.StrictMode>
);