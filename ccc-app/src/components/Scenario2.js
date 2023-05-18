import React, { useState, useEffect } from "react";
import Scenario1Map from "./war/Scenario1Map";
import StackedBarLangSent from "./StackedBarLangSent";
import BarAveLangSent from "./BarAveLangSent";
import BarLang from "./BarLang";
import PieLangPos from "./PieLangPos";

import { 
  Typography, Card,
  Grid, Container } 
  from "@mui/material";
import PageTitle from "./PageTitle";
import Scenario2Map from "./lgbt/Scenario2Map";


function Scenario2() {

  const [postData, setPostData] = useState(null)
  const [stateMonth, setStateMonth] = useState(null)
  
  function getData(url, setData) {
    fetch(url, { 
      header:{
      'Content-Type': 'application/json',
      'Accept': 'application/json'
      }
    })
    .then((res) => res.json())
    .then((data) => {
      setData(data)
      console.log(data)
      console.log(`Fetch ${url} complete`)
    })
    .catch(err => {
      console.log('======failed to fetch data=======');
      console.log(err);
    });
  }

  useEffect(() => {
      getData('http://45.113.234.176:5000/lgbt/lgbt_sent_postcode', setPostData)
      getData('http://45.113.234.176:5000/general/tweet_lang_state', setStateMonth)
  }, [])

  return (
    <>
    <PageTitle title="LGBT" />
    <Container maxWidth="lg" style={{ marginTop: '2em' }}>
      <div className='div--state-sent-map'>
        <Scenario2Map postData={postData}/>
      </div>
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
      </Grid>
    </Container>
    </>
  );
}

export default Scenario2;
