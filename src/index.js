import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { TradesProvider } from './contexts/TradesContext';



ReactDOM.render(
  <React.StrictMode>
    <TradesProvider>
      <App />
    </TradesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


