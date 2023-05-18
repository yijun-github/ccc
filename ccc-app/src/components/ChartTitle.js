import React from "react";
import { Typography } from "@mui/material";


export default function ChartTitle({title}) {
    return (
        <Typography variant="h6" align="center" sx={{ marginTop: "0.75em" }}>{title}</Typography>
    )
}