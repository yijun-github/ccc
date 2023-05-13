import './App.css';
import React from 'react';
import { Routes, Route, NavLink, Navigate } from 'react-router-dom';
import Scenario1 from './components/Scenario1';
import Scenario2 from './components/Scenario2';
import Scenario3 from './components/Scenario3';
import NotFound from './components/NotFound';

function App() {
  return (
    <>
    <nav>
      <ul>
        <li><NavLink to='/Scenario1'>Scenario 1</NavLink></li>
      </ul>
      <ul>
        <li><NavLink to='/Scenario2'>Scenario 2</NavLink></li>
      </ul>
      <ul>
        <li><NavLink to='/Scenario3'>Scenario 3</NavLink></li>
      </ul>
    </nav>
    <Routes>
      <Route path='/Scenario1' element={<Scenario1 />} />
      <Route path='/Scenario2' element={<Scenario2 />} />
      <Route path='/Scenario3' element={<Scenario3 />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
    </>
  );
}

export default App;
