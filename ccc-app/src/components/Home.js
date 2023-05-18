import React from "react";
import { Box, Card, CardContent, CardMedia, Container, Grid, Typography } from "@mui/material";
import PageTitle from "./PageTitle";
import TeamMemberCard from "./TeamMemberCard";
import ScenarioCard from "./ScenarioCard"
import PageSubtitle from "./PageSubtitle";
import SouthIcon from '@mui/icons-material/South';

import home_image from "../img/homeImage1.png"
import ukraine_russia_flag from "../img/ukraine-russia-flag.jpg";
import lgbtq_image from "../img/lgbtq-image.jpg";
import time_image from "../img/time-image.jpg";
import question_image from "../img/question-mark.png";

import PS_photo from "../img/PS.jpg";
import Aobo_photo from "../img/Aobo.jpg"


export default function Home() {
    return (
        <>
        <Container maxWidth="lg" style={{ marginTop: '2em' }}>
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} md={6} lg={4}>
                    <ScenarioCard img={ukraine_russia_flag} title="Ukraine-Russia War" link="./Scenario1" />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <ScenarioCard img={lgbtq_image} title="LGBTQ" link="./Scenario2" />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <ScenarioCard img={time_image} title="Time" link="./Scenario3" />
                </Grid>
            </Grid>
        </Container>
        <PageTitle title="Cloud Computing: Analytics" />
        <Container maxWidth="lg" style={{ marginTop: '2em' }}>
            <Grid container direction="row" justifyContent="center">
                <Grid item>
                    <PageSubtitle subtitle="Project Info" />
                </Grid>
                <Grid item>
                    <SouthIcon />
                </Grid>
            </Grid>
            <Card>
            <Typography variant="h6" align="center" color="text.secondary" gutterBottom>........FILL IN INFO........</Typography>
            </Card>
        </Container>
        <Container maxWidth="lg" style={{ marginTop: '2em' }}>
            <PageSubtitle subtitle="Team Members" />
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={6} md={4} lg={2}>
                    <TeamMemberCard img={Aobo_photo} firstName="Aobo" lastName="Li" />
                </Grid>
                <Grid item xs={6} md={4} lg={2}>
                    <TeamMemberCard img={PS_photo} firstName="Pavith" lastName="Samarakoon" />
                </Grid>
                <Grid item xs={6} md={4} lg={2}>
                    <TeamMemberCard img={question_image} firstName="FirstName" lastName="LastName" />
                </Grid>
                <Grid item xs={6} md={4} lg={2}>
                    <TeamMemberCard img={question_image} firstName="FirstName" lastName="LastName" />
                </Grid>
                <Grid item xs={6} md={4} lg={2}>
                    <TeamMemberCard img={question_image} firstName="FirstName" lastName="LastName" />
                </Grid>
            </Grid>
        </Container>
        </>
    )
}