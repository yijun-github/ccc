import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { 
  CssBaseline, Toolbar, Box } from "@mui/material";
import Scenario1 from './components/Scenario1';
import Scenario2 from './components/Scenario2';
import Scenario3 from './components/Scenario3';
import NotFound from './components/NotFound';
import Nav from './components/Nav';
import Home from './components/Home';
import SideNav from './components/SideNav';

function App() {
  return (
    <>
    <Box sx={{ display: 'flex' }}>
    <CssBaseline />
    <SideNav />
    <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
      <Toolbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Scenario1' element={<Scenario1 />} />
        <Route path='/Scenario2' element={<Scenario2 />} />
        <Route path='/Scenario3' element={<Scenario3 />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Box>
    </Box>
    </>
  );
}

export default App;
