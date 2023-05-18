import React from "react";
import { Box, Card, CardContent, CardMedia, Container, Grid, Typography } from "@mui/material";
import PageTitle from "./PageTitle";
import TeamMemberCard from "./TeamMemberCard";


export default function Home() {
    return (
        <>
        <Container>
            <div
                style={{
                    display: "flex",
                    alignItem: "center",
                    justifyContent: "center"
                }}
            >
                <Box
                    component="img"
                    sx={{
                        width:"75%",
                        height:"auto"
                    }}
                    alt="The house from the offer."
                    src={require("../img/homeImage1.png")}
                />
            </div>
        </Container>
        <PageTitle title="Cloud Computing: Social Media Analytics" />
        <Typography variant="h7">Home... Team Info, About the Project, etc.</Typography>
        <Container>
            <Typography variant="h4" align="center" gutterBottom>Project Info</Typography>
            <Card>
            <Typography variant="h6" align="center" color="text.secondary" gutterBottom>........FILL IN INFO........</Typography>
            </Card>
        </Container>
        <Container maxWidth="lg" style={{ marginTop: '50px' }}>
            <Typography variant="h4" align="center" sx={{ marginBottom: "1.5em" }}>Team Members</Typography>
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={4} md={3} lg={2}>
                    <TeamMemberCard img={"../img/PS.jpg"} firstName="Pavith" lastName="Samarakoon" />
                </Grid>
            </Grid>
        </Container>
        </>
    )
}