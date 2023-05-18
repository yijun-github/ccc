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
            image={img}
            sx={{
                borderRadius: '50%',
                width:"auto",
                height:"10em",
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