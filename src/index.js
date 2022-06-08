import React from 'react';
import {createRoot} from 'react-dom/client';
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import { SentryReplay } from '@sentry/replay';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  integrations: [new BrowserTracing(),
    new SentryReplay({
    stickySession: true, // Default is false
    rrwebConfig: {
      maskAllInputs: false, // Default is true
    },
  }),],
  initialScope: {
    tag: {
      'test-tag': 'test-value',
    }
  },
  user: {
    id: '1868582', email: 'dublin.anondson@thisdot.co',
  },
  autoSessionTracking :true,
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

Sentry.setUser({
  id: 'veryfakeverybadtest_id',
  email: 'dublin.anondson@thisdot.co',
  username: 'dublin.anondson',
  url: 'http://localhost:3000',
  ip_address: '127.0.0.1'
})

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
