import React, { useState, useEffect } from "react";

import { 
  Typography, Card,
  CardContent, Grid,
  Container } from "@mui/material";
import PageTitle from "./PageTitle";
import { getData, getDayNightData } from "../functions/fetchData";
import BarLangDayNight from "./time/BarLangDayNight";
import BarLangDayNightSortLang from "./time/BarLangDayNightSortLang";
import ChartTitle from "./ChartTitle";
import LinesHourly from "./time/LinesHourly";
import LinesHourlyNormalised from "./time/LinesHourlyNormalised";


function Scenario3({ stateData, suburbData }) {

  const [mastHourly, setMastHourly] = useState(null)
  const [mastDayNight, setMastDayNight] = useState(null)
  const [mastLangHourly, setMastLangHourly] = useState(null)
  const [mastLangDayNight, setMastLangDayNight] = useState(null)
  const [twitterHourly, setTwitterHourly] = useState(null)
  const [twitterDayNight, setTwitterDayNight] = useState(null)
  const [twitterStateHourly, setTwitterStateHourly] = useState(null)
  const [twitterLangHourly, setTwitterLangHourly] = useState(null)
  const [twitterLangDayNight, setTwitterLangDayNight] = useState(null)

  useEffect(() => {
    getData('http://45.113.234.176:5000/general/mastondon/count_hourly', setMastHourly)
    getData('http://45.113.234.176:5000/general/mastondon/count_day_night', setMastDayNight)
    //getData('http://45.113.234.176:5000/general/mastodon/language_hour', setMastLangHourly)
    getDayNightData('http://45.113.234.176:5000/general/mastodon/language_day_night', setMastLangDayNight)
    getData('http://45.113.234.176:5000/general/twitter/state_hourly_tweet', setTwitterStateHourly)
    //getData('http://45.113.234.176:5000/general/twitter/language_hour', setTwitterLangHourly)
    getDayNightData('http://45.113.234.176:5000/general/twitter/language_day_night', setTwitterLangDayNight)
  }, [])

  return (
    <>
    <PageTitle title="Time" />
    <Container style={{ marginTop: '2em', display: 'flex' }}>
      <Grid container spacing={2} justifyContent="center">
        {
          twitterStateHourly && ( mastHourly &&
            <>
            <Grid item xs={12} md={12} lg={8}>
              <Card justifyContent="center">
                <CardContent>
                  <LinesHourly data={twitterStateHourly} mastData={mastHourly} />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Card justifyContent="center">
                <CardContent>
                  <Typography>Analysis</Typography>
                </CardContent>
              </Card>
            </Grid>
            </>
          )
        }
        {
          twitterStateHourly && ( mastHourly &&
            <>
            <Grid item xs={12} md={6} lg={4}>
              <Card justifyContent="center">
                <CardContent>
                  <Typography>Analysis</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={12} lg={8}>
              <Card justifyContent="center">
                <CardContent>
                  <LinesHourlyNormalised data={twitterStateHourly} mastData={mastHourly} />
                </CardContent>
              </Card>
            </Grid>
            </>
          )
        }
        {
          mastLangDayNight &&
          <>
          <Grid item xs={12} md={6} lg={4}>
            <Card justifyContent="center">
              <CardContent>
                <ChartTitle title="Mastodon Day/Night (sort Total)" />
                <BarLangDayNight data={mastLangDayNight.slice(1)}/> {/* Remove english with slice */}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Card justifyContent="center">
              <CardContent>
                <Typography>Analysis</Typography>
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
              <ChartTitle title="Twitter Day/Night (sort Total)" />
                <BarLangDayNight data={twitterLangDayNight.slice(2)}/> {/* Remove english and undefined with slice */}
              </CardContent>
            </Card>
          </Grid>
          </>
        }
        {
          mastLangDayNight &&
          <>
          <Grid item xs={12} md={6} lg={4}>
            <Card justifyContent="center">
              <CardContent>
                <ChartTitle title="Mastodon Day/Night (sort Language)" />
                <BarLangDayNightSortLang data={mastLangDayNight.slice(1)}/> {/* Remove english with slice */}
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
                <ChartTitle title="Twitter Day/Night (sort Language)" />
                <BarLangDayNightSortLang data={twitterLangDayNight.slice(2)}/> {/* Remove english and undefined with slice */}
              </CardContent>
            </Card>
          </Grid>
          </>
        }
      </Grid>
    </Container>
    </>
      );
}

export default Scenario3;
