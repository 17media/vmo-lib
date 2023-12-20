import * as React from 'react';
import * as ReactDOM from 'react-dom/client';

import App from './App';

const appEl = document.getElementById('app');
if (appEl) {
  const root = ReactDOM.createRoot(appEl);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}
