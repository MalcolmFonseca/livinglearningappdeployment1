import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createClient } from '@supabase/supabase-js';
import {SessionContextProvider} from '@supabase/auth-helpers-react';

const supabase = createClient(
  "https://ysnoymeymlvfzxvlhzcu.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlzbm95bWV5bWx2Znp4dmxoemN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDgyMDgwMTksImV4cCI6MjAyMzc4NDAxOX0.t18yv1eVqE3vEsb26VzTXpI3hIF0bbOdpUfCdfyXZb8"
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SessionContextProvider supabaseClient={supabase}>
      <App />
    </SessionContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
