import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";


export default function TeamMemberCard({ img, firstName, lastName }) {
    return (
    <Card justifyContent="center">
        <div
            style={{
                display: "flex",
                alignItem: "center",
                justifyContent: "center"
            }}
        >
        <CardMedia
            component="img"
            image={require("../img/PS.jpg")}
            sx={{
                borderRadius: '50%',
                width:"10em",
                height:"auto",
                margin: "1em"
            }}
        />
        </div>
        <CardContent>
            <Typography variant="h6" color="text.primary" align="center">
                {firstName}
            </Typography>
            <Typography variant="h6" color="text.secondary" align="center">
                {lastName}
            </Typography>
        </CardContent>
    </Card>
    )
}