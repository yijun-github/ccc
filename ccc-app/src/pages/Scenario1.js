import React, { useEffect, useMemo, useState } from "react";
import Scenario1Map from "../components/war/Scenario1Map";

import {
  Typography, Card,
  CardContent, Grid,
  Container
} from "@mui/material";
import PageTitle from "../components/PageTitle";
import PieTotalSent from "../components/PieTotalSent";
import { getData, getLangSentData, getRUwarData } from "../functions/fetchData";
import PieTotalWarSent from "../components/common/PieTotalSent";
import LinesStateMonth from "../components/common/LinesStateMonth";
import BarTwitterLangSent from "../components/common/BarTwitLangSent";
import BarMastLangSent from "../components/common/BarMastLangSent";
import LinesStateMonthMag from "../components/common/LinesStateMonthMag";
import ScatterWarIncEdu from "../components/war/ScatterWarIncEdu";
import ScatterwarElectPartdiff from "../components/war/ScatterWarElecPartdiff";
import { AppBar, Toolbar } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import Skeleton from '@mui/material/Skeleton';
function Scenario1({ stateData = null, suburbData = null, landSent = null, title, updateTitle }) {

  const [stateMonthly, setStateMonthly] = useState(null)
  const [ruWar, setRUwar] = useState(null)
  const [twitterLangSent, setTwitterLangSent] = useState(null)
  const [mastLangSent, setMastLangSent] = useState(null)
  const [mastProp, setMastProp] = useState(null)
  const [twitterProp, setTwitterProp] = useState(null)
  const loading1 = useMemo(() => {
    return stateMonthly == null
  }, [stateMonthly])

  const loading2 = useMemo(() => {
    return twitterLangSent == null
  }, [twitterLangSent])
  const loading3 = useMemo(() => {
    return mastLangSent == null
  }, [mastLangSent])


  useEffect(() => {
    document.title = title
    updateTitle('Cluster and Cloud Computing - Team 14: Ukraine Russia War')
    getData('http://45.113.234.176:5000/war/twitter/monthly_state_sentiment', setStateMonthly)
    getData('http://45.113.234.176:5000/war/mastondon/proportion_sentiment', setMastProp)
    getData('http://45.113.234.176:5000/war/twitter/total_sentiment', setTwitterProp)
    getLangSentData('http://45.113.234.176:5000/war/twitter/sentiment_language', setTwitterLangSent)
    getLangSentData('http://45.113.234.176:5000/war/mastondon/sentiment_lang', setMastLangSent)

  }, [])

  return (
    <>


      <Container xs={12} md={12} lg={12} style={{ marginTop: '0' }}>
        <Scenario1Map stateData={stateData} suburbData={suburbData} />
      </Container>
      <Container style={{ marginTop: '2em', display: 'flex' }}>
        <Grid container spacing={2} justifyContent="center">
          {

            <>
              <Grid item xs={12} md={12} lg={8}>
                <Card justifyContent="center">
                  <CardContent>
                    {loading1 ? <Skeleton variant="rectangular" width={700} height={350} /> : <LinesStateMonth data={stateMonthly} />}
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

                    {loading1 ? <Skeleton variant="rectangular" width={700} height={350} /> : <LinesStateMonthMag data={stateMonthly} />}
                  </CardContent>
                </Card>
              </Grid>
            </>
          }
          {

            <>
              <Grid item xs={12} md={6} lg={4}>
                <Card justifyContent="center">
                  <CardContent>
                    {loading2 ? <Skeleton variant="rectangular" width={300} height={350} /> : <BarTwitterLangSent data={twitterLangSent} />}
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <Card justifyContent="center">
                  <CardContent>
                    {loading3 ? <Skeleton variant="rectangular" width={300} height={350} /> : <BarMastLangSent data={mastLangSent} />}
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
                    <ScatterWarIncEdu data={suburbData} />
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
                    <ScatterwarElectPartdiff data={suburbData} />
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
