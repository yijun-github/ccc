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
import { getData, getRUwarData } from "../functions/fetchData";
import PieTotalWarSent from "./war/PieTotalWarSent";


function Scenario1() {
  const [stateData, setStateData] = useState(null)
  const [gccData, setGccData] = useState(null)
  const [ruWar, setRUwar] = useState(null)

  useEffect(() => {
      getData('http://45.113.234.176:5000/sentiment/state_sentiment', setStateData)
      getData('http://45.113.234.176:5000/sentiment/gcc_sentiment', setGccData)
      getRUwarData('http://45.113.234.176:5000/sentiment/RUwar', setRUwar)
  }, [])

  return (
    <>
    <PageTitle title="Ukraine Russia War" />
    <Container maxWidth="lg" style={{ marginTop: '2em' }}>
      <Scenario1Map stateData={stateData} gccData={gccData} />
    </Container>
    <Container style={{ marginTop: '2em', display: 'flex' }}>
      <Grid container spacing={2} justifyContent="center">
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
          {
          ruWar &&
          <Grid item xs={12} md={6} lg={4}>
            <Card>
              <PieTotalWarSent data={ruWar}/>
            </Card>
          </Grid>
          }
      </Grid>
    </Container>
    </>
  );
}

export default Scenario1;
