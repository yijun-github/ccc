import React from "react";
import Scenario1Map from "./Scenario1Map";
import StackedBarLangSent from "./StackedBarLangSent";
import BarAveLangSent from "./BarAveLangSent";
import BarLang from "./BarLang";
import PieLangPos from "./PieLangPos";

import { 
  Typography, AppBar,
  Card, CardActions,
  CardContent, CardMedia,
  CssBaseline, Grid,
  Toolbar, Container,
  Button } from "@mui/material";
import PageTitle from "./PageTitle";


function Scenario1() {
  return (
    <>
    <PageTitle title="Ukraine Russia War" />
    <Container maxWidth="lg" style={{ marginTop: '50px' }}>
      <div className='div--state-sent-map'>
        <Scenario1Map />
      </div>
    </Container>
    <Container style={{ marginTop: '50px', display: 'flex' }}>
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

export default Scenario1;
