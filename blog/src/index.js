import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import reportWebVitals from './reportWebVitals';

import { store } from './store';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';

ReactDOM.render(
  <Provider store={store}>
    <App />
    <Toaster
      position='bottom-right'
      containerClassName='blog-toast-container'
      toastOptions={{
        className: '',
        duration: 3000,
        style: {
          background: '#363636',
          color: '#fff',
        },
        success: {
          theme: {
            primary: 'green',
            secondary: 'black',
          },
        },
        error: {
          theme: {
            primary: 'red',
            secondary: 'black'
          }
        }
      }}
    />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
