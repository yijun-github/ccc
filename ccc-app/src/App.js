import './App.css';
import React, { useEffect, useState } from 'react';
import { Routes, Route, Router } from 'react-router-dom';
import { 
  CssBaseline, Toolbar, Box } from "@mui/material";
import Scenario1 from './components/Scenario1';
import Scenario2 from './components/Scenario2';
import Scenario3 from './components/Scenario3';
import NotFound from './components/NotFound';
import Home from './components/Home';
import SideNav from './components/SideNav';
import ScrollToTop from './components/ScrollToTop';
import { getData } from './functions/fetchData';

function App() {

  const [stateData, setStateData] = useState(null)
  const [suburbData, setSuburbData] = useState(null)

  useEffect(() => {
      getData('http://127.0.0.1:5000/war/twitter/state_sentiment', setStateData)
      getData('http://127.0.0.1:5000/war/twitter/suburb_sentiment', setSuburbData)
  }, [])
  
  return (
    <>
    <ScrollToTop />
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
          <Route path='/Scenario1' element={<Scenario1 stateData={stateData} suburbData={suburbData} />} />
          <Route path='/Scenario2' element={<Scenario2 stateData={stateData} suburbData={suburbData} />} />
          <Route path='/Scenario3' element={<Scenario3 />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Box>
    </Box>
    </>
  );
}

export default App;
