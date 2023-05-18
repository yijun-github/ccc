import React from "react";
import Scenario1Map from "./war/Scenario1Map";
import StackedBarLangSent from "./StackedBarLangSent";
import BarAveLangSent from "./BarAveLangSent";
import BarLang from "./BarLang";
import PieLangPos from "./PieLangPos";
import LinesByHour from "./general/LinesByHour";

import { 
  Typography, AppBar,
  Card, CardActions,
  CardContent, CardMedia,
  CssBaseline, Grid,
  Toolbar, Container,
  Button } from "@mui/material";
import PageTitle from "./PageTitle";


function Scenario3() {
  return (
    <>
    <PageTitle title="Time" />
    <Container maxWidth="lg" style={{ marginTop: '0' }}>
      <div className='div--state-sent-map'>
        <Scenario1Map />
      </div>
    </Container>
    <Container style={{ marginTop: '2em', display: 'flex' }}>
      <Grid container spacing={2} justify="center">
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
          <Grid item xs={12} md={12} lg={8}>
            <Card>
              <LinesByHour />
            </Card>
          </Grid>
      </Grid>
    </Container>
    </>
  );
}

export default Scenario3;
