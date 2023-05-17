import React, { useEffect, useState } from "react";
import Scenario1Map from "./war/Scenario1Map";
import StackedBarLangSent from "./StackedBarLangSent";
import BarAveLangSent from "./BarAveLangSent";
import BarLang from "./BarLang";
import PieLangPos from "./PieLangPos";

import { 
  Typography, AppBar,
  Card, CardActions,
  CardContent, CardMedia,
  CssBaseline, Grid,
  Toolbar, Container,
  Button } from "@mui/material";
import PageTitle from "./PageTitle";
import PieTotalSent from "./PieTotalSent";
import PieTotalSent2 from "./PieTotalSent2";


function Scenario1() {
  const [gccData, setGccData] = useState(null)
  
  async function getData(url, setData) {
    const response = await fetch(url);
    const json = await response.json()
    setData(json)
    console.log(json);
    console.log("Fetch Scenario 1 complete")
  }

  useEffect(() => {
      getData('http://45.113.234.176:5000/sentiment/war_monthly_state_proportion', setGccData)
  }, [])

  return (
    <>
    <PageTitle title="Ukraine Russia War" />
    <Container maxWidth="lg" style={{ marginTop: '50px' }}>
      <div className='div--state-sent-map'>
        <Scenario1Map gccData={gccData} />
      </div>
    </Container>
    <Container style={{ marginTop: '50px', display: 'flex' }}>
      <Grid container spacing={2} justify="center">
          <Grid item xs={12} md={6} lg={4}>
            <Card>
              <StackedBarLangSent />
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Card>
              <BarAveLangSent />
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Card>
              <BarLang />
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Card>
              <PieLangPos />
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Card>
              <PieTotalSent2 />
            </Card>
          </Grid>
      </Grid>
    </Container>
    </>
  );
}

export default Scenario1;
