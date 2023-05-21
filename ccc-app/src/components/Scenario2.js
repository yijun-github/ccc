/*
COMP90024 Project 2 2023
Contributer
Aobo Li              1172339
Pavith Samarakoon    1297058
Zhihao Liang         1367102
Jiqiang Chen         1171420
Yijun Liu            1132416
*/
import React, { useEffect, useState } from "react";
import Scenario2Map from "./lgbtq/Scenario2Map";

import { 
  Typography, Card, 
  CardContent, Grid,
  Container } from "@mui/material";
import PageTitle from "./PageTitle";
import { getData, getLangSentData, getRUwarData } from "../functions/fetchData";
import LinesStateMonth from "./common/LinesStateMonth";
import LinesStateMonthMag from "./common/LinesStateMonthMag";
import BarTwitterLangSent from "./common/BarTwitLangSent";
import BarMastLangSent from "./common/BarMastLangSent";
import PieTotalWarSent from "./common/PieTotalSent";
import ScatterLgbtIncEdu from "./lgbtq/ScatterLgbtIncEdu";
import ScatterLgbtElectPartdiff from "./lgbtq/ScatterLgbtElecPartdiff";



function Scenario2({ stateData=null, suburbData=null, landSent=null }) {

  const [stateMonthly, setStateMonthly] = useState(null)
  const [twitterLangSent, setTwitterLangSent] = useState(null)
  const [mastLangSent, setMastLangSent] = useState(null)
  const [mastProp, setMastProp] = useState(null)
  const [twitterProp, setTwitterProp] = useState(null)

  useEffect(() => {
      getData('http://127.0.0.1:5000/lgbt/twitter/monthly_state_sentiment', setStateMonthly)
      getData('http://127.0.0.1:5000/lgbt/twitter/total_sentiment', setTwitterProp)
      getLangSentData('http://127.0.0.1:5000/lgbt/twitter/sentiment_language', setTwitterLangSent)
      getLangSentData('http://127.0.0.1:5000/lgbt/mastondon/sentiment_lang', setMastLangSent)
      getData('http://127.0.0.1:5000/lgbt/mastondon/overall_sentiment', setMastProp)
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
                <Typography variant="b1">
                  <b>Difference in pos/neg:</b><br/>
                  In the map of LGBT sentiment, we see rural regions with more extreme sentiment, however, this
                  is most likely due to the small sample sizes outside of major cities. Proportional difference
                  between positive and negative sentiment seems to have not changed significantly over the 6 month
                  period, however, there are significant month-to-month fluctuations within each state, most clearly
                  in tasmania and NT but again this is likely due to smaller sample sizes. Overall most states tend
                  have a positive sentiment when dicussing LGBT topics.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Card justifyContent="center">
              <CardContent>
                <Typography variant="b1">
                  <b>Magnitude of sentiment:</b><br/>
                  Mean magnitude of sentiment has also remained quite steady over this period, showing only some small
                  fluctuations in each state. It may be worth noting that there appears to be no sign of a change in
                  sentiment proportion or magnitude of sentiment during pride month (June), except Tasmania which tended
                  towards a more negative sentiment for this month.
                </Typography>
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
                <Typography variant="b1">
                  <b>Sentiment proportion:</b><br/>
                  Positive sentiment seems to be significantly higher across all of the top 10 languages on mastodon. 
                  Among the languages appearing in the top 10 for both platforms, english(en) is slighly more 
                  positive on mastodon, but may not be significant with the small samples available through mastodon, 
                  french (fr) and especially spanish (es) were much more positive on mastodon. Most of this difference 
                  seems to be a shift from neutral to positive across platforms.
                </Typography>
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
                <Typography variant="b1">
                  <b>Overall sentiment</b><br/>
                  As expected based on the previous top 10 language plots, mastodon shows much higher overall positive 
                  sentiment towards LGBT discussion than twitter. Twitter has ~10% more negative sentiment, however, 
                  we also see ~20% lower positive sentiment.
                  </Typography>
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
                <Typography variant="b1">
                  <b>Median Income vs proportion of negative sentiment</b><br/>
                  There does not appear to be any obvious correlation between positive sentiment median income or {">"}25% of residents 
                  having university degree across suburbs in australia. There are very few suburbs with {">"}25% university degrees that have 
                  {"<"}20% positive sentiment, in contrast to many suburbs with {"<"}25% university degrees, which may suggest a potential 
                  trend towards more positive attitudes towards LGBT discussion as more residents have completed a degree. (While not a 
                  focus of this analysis, as expected, suburbs which higher degree percentages tended to earn more).
                  </Typography>
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
                <Typography variant="b1">
                <b>Male-Female Emp % diff vs Negative sentiment%</b><br/>
                  There does not appear to be an correlation between the difference between male and female employment rates and positive sentiment.
                  Political party preference also does not seem to show any significant correlation, however, there is potentially lower variance 
                  in positive sentiment among suburbs which voted for labor and have smaller male-female employment rate differences.
                </Typography>
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
