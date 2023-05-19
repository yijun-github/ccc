import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";


export default function ScenarioCard({ img, title, link }) {
    return (
    <CardActionArea component={NavLink} to={link}>
        <Card justifyContent="center" style={{ borderRadius: '1em' }}>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
            <CardMedia
                component="img"
                image={img}
                sx={{
                    borderRadius: '1em 1em 0 0',
                    width:"100%",
                    height:"20em",
                    margin: 0
                }}
            />
            </div>
            <CardContent style={{ 
                background: "black",
                borderRadius: '0 0 1em 1em',
                width:"100%" }}>
                <Typography variant="h5" color="white" align="center">
                    {title}
                </Typography>
            </CardContent>
        </Card>
    </CardActionArea>
    )
}