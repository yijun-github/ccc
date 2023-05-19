import React, { useEffect, useState } from "react";
import Scenario1Map from "./war/Scenario1Map";
import StackedBarLangSent from "./StackedBarLangSent";
import BarAveLangSent from "./BarAveLangSent";
import BarLang from "./BarLang";
import PieLangPos from "./PieLangPos";

import { 
  Typography, Card, 
  CardContent, Grid,
  Container } from "@mui/material";
import PageTitle from "./PageTitle";
import PieTotalSent from "./PieTotalSent";
import { getData, getLangSentData, getRUwarData } from "../functions/fetchData";
import PieTotalWarSent from "./war/PieTotalWarSent";
import LinesStateMonth from "./war/LinesStateMonth";


function Scenario1({ stateData=null, suburbData=null, landSent=null }) {

  const [stateMonthly, setStateMonthly] = useState(null)
  const [ruWar, setRUwar] = useState(null)
  const [mastLangSent, setMastLangSent] = useState(null)

  useEffect(() => {
      getData('http://127.0.0.1:5000/war/twitter/monthly_state_sentiment', setStateMonthly)
      getData('http://127.0.0.1:5000/war/mastondon/sentiment_lang', setMastLangSent)
  }, [])

  return (
    <>
    <PageTitle title="Ukraine Russia War" />
    <Container maxWidth="lg" style={{ marginTop: '0' }}>
      <Scenario1Map stateData={stateData} suburbData={suburbData} />
    </Container>
    <Container style={{ marginTop: '2em', display: 'flex' }}>
      <Grid container spacing={2} justifyContent="center">
        {
          stateMonthly &&
          <Grid item xs={12} md={12} lg={8}>
            <Card justifyContent="center">
              <CardContent>
                <LinesStateMonth data={stateMonthly} />
              </CardContent>
            </Card>
          </Grid>
        }
        <Grid item xs={12} md={6} lg={4}>
          <Card justifyContent="center">
            <CardContent>
              <StackedBarLangSent />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Card justifyContent="center">
            <CardContent>
              <BarAveLangSent />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Card justifyContent="center">
            <CardContent>
              <BarLang />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Card justifyContent="center">
            <CardContent>
              <PieLangPos />
            </CardContent>
          </Card>
        </Grid>
        {
        ruWar &&
        <Grid item xs={12} md={6} lg={4}>
          <Card justifyContent="center">
            <CardContent>
              <PieTotalWarSent data={ruWar}/>
            </CardContent>
          </Card>
        </Grid>
        }
      </Grid>
    </Container>
    </>
  );
}

export default Scenario1;
