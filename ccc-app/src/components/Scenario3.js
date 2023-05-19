import React, { useState, useEffect } from "react";
import Scenario1Map from "./war/Scenario1Map";
import StackedBarLangSent from "./StackedBarLangSent";
import BarAveLangSent from "./BarAveLangSent";
import BarLang from "./BarLang";
import PieLangPos from "./PieLangPos";
import LinesByHour from "./general/LinesByHour";

import { 
  Typography, Card,
  CardContent, Grid,
  Container } from "@mui/material";
import PageTitle from "./PageTitle";
import { getData, getDayNightData } from "../functions/fetchData";
import BarLangDayNight from "./general/BarLangDayNight";
import BarLangDayNightSortLang from "./general/BarLangDayNightSortLang";
import ChartTitle from "./ChartTitle";


function Scenario3() {

  const [stateHourly, setStateHourly] = useState(null)
  const [langHourly, setLangHourly] = useState(null)
  const [langDayNight, setLangDayNight] = useState(null)
  const [mastHourSent, setMastHourSent] = useState(null)

  useEffect(() => {
    getData('http://127.0.0.1:5000/general/twitter/state_hourly_tweet', setStateHourly)
    getData('http://127.0.0.1:5000/general/twitter/language_hour', setLangHourly)
    getDayNightData('http://127.0.0.1:5000/general/tweet_lang_hourRange', setLangDayNight)
    getData('http://127.0.0.1:5000/general/mastondon/proportion_sentiment', setMastHourSent)
  }, [])

  return (
    <>
    <PageTitle title="Time" />
    <Container maxWidth="lg" style={{ marginTop: '0' }}>
      <div className='div--state-sent-map'>
        <Scenario1Map />
      </div>
    </Container>
    <Container style={{ marginTop: '2em', display: 'flex' }}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} md={12} lg={8}>
          <Card justifyContent="center">
            <CardContent>
              <LinesByHour />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Card justifyContent="center">
            <CardContent>
              <StackedBarLangSent />
            </CardContent>
          </Card>
        </Grid>
        {
          langDayNight &&
          <>
          <Grid item xs={12} md={6} lg={4}>
            <Card justifyContent="center">
              <CardContent>
                <BarLangDayNight data={langDayNight}/>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Card justifyContent="center">
              <CardContent>
                <ChartTitle title="Day/Night Tweets (sort Language)" />
                <BarLangDayNightSortLang data={langDayNight}/>
              </CardContent>
            </Card>
          </Grid>
          </>
        }
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
      </Grid>
    </Container>
    </>
  );
}

export default Scenario3;
