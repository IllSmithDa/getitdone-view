import React from 'react';
import Login from '../Login/Login';
import './Homepage.css';

export default function Homepage() {
  return (
    <div className="page-margins">
      <h1 className='homepage-title'>Get It Done</h1>
      <Login />
    </div>
  );
}