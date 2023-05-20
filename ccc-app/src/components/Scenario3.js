import React, { useState, useEffect } from "react";
import Scenario1Map from "./war/Scenario1Map";
import StackedBarLangSent from "./StackedBarLangSent";
import BarAveLangSent from "./BarAveLangSent";
import BarLang from "./BarLang";
import PieLangPos from "./PieLangPos";
import LinesByHour from "./time/LinesByHour";

import { 
  Typography, Card,
  CardContent, Grid,
  Container } from "@mui/material";
import PageTitle from "./PageTitle";
import { getData, getDayNightData } from "../functions/fetchData";
import BarLangDayNight from "./time/BarLangDayNight";
import BarLangDayNightSortLang from "./time/BarLangDayNightSortLang";
import ChartTitle from "./ChartTitle";


function Scenario3() {

  const [mastHourly, setMastHourly] = useState(null)
  const [mastDayNight, setMastDayNight] = useState(null)
  const [mastLangHourly, setMastLangHourly] = useState(null)
  const [mastLangDayNight, setMastLangDayNight] = useState(null)
  const [twitterLangDayNight, setTwitterLangDayNight] = useState(null)

  useEffect(() => {
    //getData('http://127.0.0.1:5000/general/mastondon/count_hourly', setMastHourly)
    //getData('http://127.0.0.1:5000/general/mastondon/count_day_night', setMastDayNight)
    //getData('http://127.0.0.1:5000/general/mastodon/language_hour', setMastLangHourly)
    //getData('http://127.0.0.1:5000/general/mastodon/language_day_night', setMastLangDayNight)
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
          mastLangDayNight &&
          <>
          <Grid item xs={12} md={6} lg={4}>
            <Card justifyContent="center">
              <CardContent>
                <BarLangDayNight data={mastLangDayNight}/>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Card justifyContent="center">
              <CardContent>
                <ChartTitle title="Day/Night Tweets (sort Language)" />
                <BarLangDayNightSortLang data={mastLangDayNight}/>
              </CardContent>
            </Card>
          </Grid>
          </>
        }
        {
          twitterLangDayNight &&
          <>
          <Grid item xs={12} md={6} lg={4}>
            <Card justifyContent="center">
              <CardContent>
                <BarLangDayNight data={twitterLangDayNight}/>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Card justifyContent="center">
              <CardContent>
                <ChartTitle title="Day/Night Tweets (sort Language)" />
                <BarLangDayNightSortLang data={twitterLangDayNight}/>
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
