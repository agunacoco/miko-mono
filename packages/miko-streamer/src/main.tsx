import './index.css';

import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';

import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { ToastContainer } from './state/swr/fetcher';
import theme from './theme';

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <ChakraProvider resetCSS theme={theme}>
        <App />
        <ToastContainer />
      </ChakraProvider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root'),
);

serviceWorkerRegistration.unregister();

reportWebVitals();
