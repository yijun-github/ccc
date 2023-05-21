import './App.css';
import React, { useEffect, useState } from 'react';
import { Routes, Route, Router } from 'react-router-dom';
import { 
  CssBaseline, Toolbar, Box, createTheme, Button, ThemeProvider } from "@mui/material";
import Scenario1 from './components/Scenario1';
import Scenario2 from './components/Scenario2';
import Scenario3 from './components/Scenario3';
import NotFound from './components/NotFound';
import Home from './components/Home';
import SideNav from './components/SideNav';
import ScrollToTop from './components/ScrollToTop';
import { getData } from './functions/fetchData';

function App() {

  const theme = createTheme({
    palette: {
      background: {
        default: "#d4dadc"
      }
    }
  });

  const [stateData, setStateData] = useState(null)
  const [suburbData, setSuburbData] = useState(null)

  useEffect(() => {
      getData('/state_geojson', setStateData)
      getData('/suburb_geojson', setSuburbData)
  }, [])
  
  return (
    <><ThemeProvider theme={theme}>
      <CssBaseline />
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
    </ThemeProvider>
    
    </>
  );
}

export default App;
