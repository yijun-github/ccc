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
    <PageTitle title="Scenario 3" />
    <Container maxWidth="lg" style={{ marginTop: '50px' }}>
      <div className='div--state-sent-map'>
        <Scenario1Map />
      </div>
    </Container>
    <Container style={{ marginTop: '50px', display: 'flex' }}>
      <Grid container spacing={2} justify="center">
          <Grid item>
            <Card>
              <StackedBarLangSent />
            </Card>
          </Grid>
          <Grid item>
            <Card>
              <BarAveLangSent />
            </Card>
          </Grid>
          <Grid item>
            <Card>
              <BarLang />
            </Card>
          </Grid>
          <Grid item>
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
