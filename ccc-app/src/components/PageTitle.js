import React from "react";
import { Card, Container, Typography  } from "@mui/material";


export default function PageTitle({title}) {
    return (
            <Card style={{ marginTop: "1em", marginBottom: "1em", background: 'linear-gradient(to right, #FFF, #000, #000, #000, #FFF)' }}>
                <Typography className="scenario-title" variant="h2" align="center" color="white" style={{ margin: "0.2em" }}>
                    {title}
                </Typography>
            </Card>
    )
}