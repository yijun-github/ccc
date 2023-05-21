import './App.css';
import React, { useEffect, useState } from 'react';
import { Routes, Route, Router } from 'react-router-dom';
import {
  CssBaseline, Toolbar, Box, createTheme, Button, ThemeProvider
} from "@mui/material";
import Scenario1 from './pages/Scenario1';
import Scenario2 from './pages/Scenario2';
import Scenario3 from './pages/Scenario3';
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
  const [title, setTitle] = useState('CCC Team 14')
  useEffect(() => {
    getData('http://45.113.234.176:5000/state_geojson', setStateData)
    getData('http://45.113.234.176:5000/suburb_geojson', setSuburbData)
  }, [])

  const updateTitle = (newTitle) => {
    setTitle(newTitle)
  }
  return (
    <><ThemeProvider theme={theme}>
      <CssBaseline />
      <ScrollToTop />
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <SideNav title={title} />
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
        >
          <Toolbar />
          <Routes>
            <Route path='/' element={<Home updateTitle={updateTitle} />} />
            <Route path='/scenario1' element={<Scenario1 stateData={stateData} suburbData={suburbData} title="Scenario1: Ukraine Russia War" updateTitle={updateTitle} />} />
            <Route path='/scenario2' element={<Scenario2 stateData={stateData} suburbData={suburbData} title="Scenario2: LGBTQ" updateTitle={updateTitle} />} />
            <Route path='/scenario3' element={<Scenario3 title="Scenario3: Time" updateTitle={updateTitle} />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Box>
      </Box>
    </ThemeProvider>

    </>
  );
}

export default App;
