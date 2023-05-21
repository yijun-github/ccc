/*
COMP90024 Project 2 2023
Contributer
Aobo Li              1172339
Pavith Samarakoon    1297058
Zhihao Liang         1367102
Jiqiang Chen         1171420
Yijun Liu            1132416
*/
import React from "react";
import { Box, Card, CardContent, CardMedia, Container, Grid, Typography } from "@mui/material";
import PageTitle from "./PageTitle";
import TeamMemberCard from "./TeamMemberCard";
import ScenarioCard from "./ScenarioCard"
import PageSubtitle from "./PageSubtitle";
import SouthIcon from '@mui/icons-material/South';

import ukraine_russia_flag from "../img/ukraine-russia-flag.jpg";
import lgbtq_image from "../img/lgbtq-image.jpg";
import time_image from "../img/time-image.jpg";
import blank_profile_image from "../img/blank-profile.png";

import PS_photo from "../img/PS.jpg";
import Aobo_photo from "../img/Aobo.jpg"
import zhihao_photo from "../img/zhihao.jpg"

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
            <Card><Box sx={{ mx: '2em', my: '1em' }}>
                <Typography variant="b1" align="center" color="text.secondary" gutterBottom>
                    This website is developed to visualise the result of the project “Australia Social Media Analytics on the Cloud”. 
                    This project builds on Unimelb Research Cloud and utilises data from twitter, Mastodon and Spatial Urban Data Observatory(SUDO) 
                    to create a deep analysis of controversial topics on social media. <br></br>
                    The analysis investigates 3 different scenarios: Ukraine-Russian War, LGBT and time of people using social media.
                    For all Twitter data, we try to retrieve information from the geometric location and sentiment, 
                    and integrate this with socio-economic data from SUDO in order to obtain a well rounded result on different 
                    aspects of each of our scenarios. As we are not able to extract location data for Mastodon, we will only be using it 
                    as a comparison/contrast between social media platforms/users, as we cannot infer any socio-economic characteristics
                    for Mastodon users.
                </Typography>
                </Box>
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
                    <TeamMemberCard img={zhihao_photo} firstName="Zhihao" lastName="Liang" />
                </Grid>
                <Grid item xs={6} md={4} lg={2}>
                    <TeamMemberCard img={blank_profile_image} firstName="Yijun" lastName="Liu" />
                </Grid>
                <Grid item xs={6} md={4} lg={2}>
                    <TeamMemberCard img={blank_profile_image} firstName="Jiqiang" lastName="Chen" />
                </Grid>
            </Grid>
        </Container>
        </>
    )
}