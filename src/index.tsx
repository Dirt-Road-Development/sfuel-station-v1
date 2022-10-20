import '@rainbow-me/rainbowkit/styles.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import BalanceProvider from './components/BalanceProvider';
import ThemeProvider from './components/ThemeProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider>
        <BalanceProvider>
            <App />
        </BalanceProvider>
    </ThemeProvider>
  </React.StrictMode>
);
