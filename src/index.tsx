// react libraries
import * as React from 'react';
import * as ReactDOM from 'react-dom';

// third party packages
import { BrowserRouter } from 'react-router-dom';

// components
import App from './App/index';

// eslint-disable-next-line react/no-render-return-value
export const app = ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root') || document.createElement('div')
);

export default app;
