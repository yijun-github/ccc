import React, { useEffect, useState } from "react";
import Scenario2Map from "../components/lgbtq/Scenario2Map";

import {
  Typography, Card,
  CardContent, Grid,
  Container
} from "@mui/material";
import PageTitle from "../components/PageTitle";
import { getData, getLangSentData, getRUwarData } from "../functions/fetchData";
import LinesStateMonth from "../components/common/LinesStateMonth";
import LinesStateMonthMag from "../components/common/LinesStateMonthMag";
import BarTwitterLangSent from "../components/common/BarTwitLangSent";
import BarMastLangSent from "../components/common/BarMastLangSent";
import PieTotalWarSent from "../components/common/PieTotalSent";
import ScatterLgbtIncEdu from "../components/lgbtq/ScatterLgbtIncEdu";
import ScatterLgbtElectPartdiff from "../components/lgbtq/ScatterLgbtElecPartdiff";



function Scenario2({ stateData = null, suburbData = null, landSent = null ,title, updateTitle}) {

  const [stateMonthly, setStateMonthly] = useState(null)
  const [twitterLangSent, setTwitterLangSent] = useState(null)
  const [mastLangSent, setMastLangSent] = useState(null)
  const [mastProp, setMastProp] = useState(null)
  const [twitterProp, setTwitterProp] = useState(null)

  useEffect(() => {
    document.title = title
    updateTitle('CCC Team 14: LGBTQ')
    getData('http://45.113.234.176:5000/lgbt/twitter/monthly_state_sentiment', setStateMonthly)
    getData('http://45.113.234.176:5000/lgbt/twitter/total_sentiment', setTwitterProp)
    getLangSentData('http://45.113.234.176:5000/lgbt/twitter/sentiment_language', setTwitterLangSent)
    getLangSentData('http://45.113.234.176:5000/lgbt/mastondon/sentiment_lang', setMastLangSent)
    getData('http://45.113.234.176:5000/lgbt/mastondon/overall_sentiment', setMastProp)
  }, [])

  return (
    <>
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
          {
            suburbData != null &&
            <>
              <Grid item xs={12} md={12} lg={8}>
                <Card justifyContent="center">
                  <CardContent>
                    <ScatterLgbtIncEdu data={suburbData} />
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
            suburbData != null &&
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
                    <ScatterLgbtElectPartdiff data={suburbData} />
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

export default Scenario2;
