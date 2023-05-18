import { Typography } from "@mui/material";
import React from "react";


export default function PageSubtitle({ subtitle }) {
    return (
        <Typography variant="h4" align="center" sx={{ marginBottom: "0.5em" }}>{subtitle}</Typography>
    )
}