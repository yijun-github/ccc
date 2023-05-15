import React from "react";
import { Container, Typography  } from "@mui/material";


export default function PageTitle({title}) {
    return (
        <Container style={{ marginTop: '20px' }}>
            <Typography className="scenario-title" variant="h2" align="center" color="textPrimary" gutterBottom>
                {title}
            </Typography>
        </Container>
    )
}