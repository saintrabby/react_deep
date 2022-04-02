// import logo from '../logo.svg';

import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import PostList from '../pages/PostList';

import './App.css';

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        {/* <div className="App">
      </div> */}
        <Routes>
          <Route path='/' element={<PostList />} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
