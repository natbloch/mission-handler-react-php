import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { MissionContextProvider } from './context/MissionContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <MissionContextProvider>
        <App />
      </MissionContextProvider>
  </React.StrictMode>
);

