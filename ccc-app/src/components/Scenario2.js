import React, { useEffect, useState } from "react";
import Scenario2Map from "./lgbtq/Scenario2Map";

import { 
  Typography, Card, 
  CardContent, Grid,
  Container } from "@mui/material";
import PageTitle from "./PageTitle";
import { getData, getLangSentData, getRUwarData } from "../functions/fetchData";
import LinesStateMonth from "./war/LinesStateMonth";
import LinesStateMonthMag from "./war/LinesStateMonthMag";
import BarTwitterLangSent from "./war/BarTwitLangSent";
import BarMastLangSent from "./war/BarMastLangSent";
import PieTotalWarSent from "./war/PieTotalSent";



function Scenario2({ stateData=null, suburbData=null, landSent=null }) {

  const [stateMonthly, setStateMonthly] = useState(null)
  const [twitterLangSent, setTwitterLangSent] = useState(null)
  const [mastLangSent, setMastLangSent] = useState(null)
  const [mastProp, setMastProp] = useState(null)
  const [twitterProp, setTwitterProp] = useState(null)

  useEffect(() => {
      getData('http://127.0.0.1:5000/lgbt/twitter/monthly_state_sentiment', setStateMonthly)
      getData('http://127.0.0.1:5000/lgbt/mastondon/proportion_sentiment', setMastProp)
      getData('http://127.0.0.1:5000/lgbt/twitter/total_sentiment', setTwitterProp)
      getLangSentData('http://127.0.0.1:5000/lgbt/twitter/sentiment_language', setTwitterLangSent)
      getLangSentData('http://127.0.0.1:5000/lgbt/mastondon/sentiment_lang', setMastLangSent)
  }, [])

  return (
    <>
    <PageTitle title="LGBTQ" />
    <Container maxWidth="lg" style={{ marginTop: '0' }}>
      <Scenario2Map stateData={stateData} suburbData={suburbData} />
    </Container>
    <Container style={{ marginTop: '2em', display: 'flex' }}>
      <Grid container spacing={2} justifyContent="center">
        {
          stateMonthly &&
          <>
          <Grid item xs={12} md={12} lg={8}>
            <Card justifyContent="center">
              <CardContent>
                <LinesStateMonth data={stateMonthly} />
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
                <LinesStateMonthMag data={stateMonthly} />
              </CardContent>
            </Card>
          </Grid>
          </>
        }
        {
          twitterLangSent && (mastLangSent &&
          <>
          <Grid item xs={12} md={6} lg={4}>
            <Card justifyContent="center">
              <CardContent>
                <BarTwitterLangSent data={twitterLangSent} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Card justifyContent="center">
              <CardContent>
                <BarMastLangSent data={mastLangSent} />
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
        mastProp && (twitterProp &&
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
                <PieTotalWarSent mastProp={mastProp} twitterProp={twitterProp} />
              </CardContent>
            </Card>
          </Grid>
          </>
          )
        }
      </Grid>
    </Container>
    </>
  );
}

export default Scenario2;
