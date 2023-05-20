import React, { useEffect, useState } from "react";
import Scenario1Map from "./war/Scenario1Map";

import { 
  Typography, Card, 
  CardContent, Grid,
  Container } from "@mui/material";
import PageTitle from "./PageTitle";
import PieTotalSent from "./PieTotalSent";
import { getData, getLangSentData, getRUwarData } from "../functions/fetchData";
import PieTotalWarSent from "./common/PieTotalSent";
import LinesStateMonth from "./common/LinesStateMonth";
import BarTwitterLangSent from "./common/BarTwitLangSent";
import BarMastLangSent from "./common/BarMastLangSent";
import LinesStateMonthMag from "./common/LinesStateMonthMag";
import ScatterWarIncEduSent from "./war/ScatterWarIncEduSent";


function Scenario1({ stateData=null, suburbData=null, landSent=null }) {

  const [stateMonthly, setStateMonthly] = useState(null)
  const [ruWar, setRUwar] = useState(null)
  const [twitterLangSent, setTwitterLangSent] = useState(null)
  const [mastLangSent, setMastLangSent] = useState(null)
  const [mastProp, setMastProp] = useState(null)
  const [twitterProp, setTwitterProp] = useState(null)

  useEffect(() => {
      getData('http://127.0.0.1:5000/war/twitter/monthly_state_sentiment', setStateMonthly)
      getData('http://127.0.0.1:5000/war/mastondon/proportion_sentiment', setMastProp)
      getData('http://127.0.0.1:5000/war/twitter/total_sentiment', setTwitterProp)
      getLangSentData('http://127.0.0.1:5000/war/twitter/sentiment_language', setTwitterLangSent)
      getLangSentData('http://127.0.0.1:5000/war/mastondon/sentiment_lang', setMastLangSent)
  }, [])

  return (
    <>
    <PageTitle title="Ukraine Russia War" />
    <Container xs={12} md={12} lg={12} style={{ marginTop: '0' }}>
      <Scenario1Map stateData={stateData} suburbData={suburbData} />
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
        {
          suburbData != null &&
          <>
          <Grid item xs={12} md={12} lg={8}>
            <Card justifyContent="center">
              <CardContent>
                <ScatterWarIncEduSent data={suburbData} />
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
      </Grid>
    </Container>
    </>
  );
}

export default Scenario1;
