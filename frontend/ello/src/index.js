import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ApolloProviderWrapper from './ApolloClient';

ReactDOM.render(
  <React.StrictMode>
    <ApolloProviderWrapper>
      <App />
    </ApolloProviderWrapper>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
