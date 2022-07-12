import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Login from './components/LoginReg';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Board from './components/workEfficiently/Board';
import PrivateRoute from './components/PrivateRoute';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
    <Router>
      <Routes>
        <Route exact path="/ShopWebLearn"  element={<Login />}/>
        <Route element={<PrivateRoute />}>
          <Route path="/homepage" element={<App />}/>
          <Route path="/homepage/whiteboard" element={<Board />}/>
        </Route>
      </Routes>
    </Router>
  </div>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();