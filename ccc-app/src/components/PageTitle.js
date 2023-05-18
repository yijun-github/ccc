import React from "react";
import { Container, Typography  } from "@mui/material";


export default function PageTitle({title}) {
    return (
        <Container style={{ marginTop: 0, marginBottom: 0, background: 'linear-gradient(to right, #FFF, #6dd5ed, #FFF)' }}>
            <Typography className="scenario-title" variant="h2" align="center" color="textPrimary" gutterBottom>
                {title}
            </Typography>
        </Container>
    )
}