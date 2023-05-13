import './App.css';
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Scenario1 from './components/Scenario1';
import Scenario2 from './components/Scenario2';
import Scenario3 from './components/Scenario3';

function App() {
  return (
    <>
    <nav>
      <ul>
        <li><Link to='/Scenario1'>Scenario 1</Link></li>
      </ul>
      <ul>
        <li><Link to='/Scenario2'>Scenario 2</Link></li>
      </ul>
      <ul>
        <li><Link to='/Scenario3'>Scenario 3</Link></li>
      </ul>
    </nav>
    <Routes>
      <Route path='/Scenario1' element={<Scenario1 />} />
      <Route path='/Scenario2' element={<Scenario2 />} />
      <Route path='/Scenario3' element={<Scenario3 />} />
    </Routes>
    </>
  );
}

export default App;
