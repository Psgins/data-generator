import { FC } from "react";
import { AppBar, Container, Grid, Typography } from "@mui/material";

const Footer: FC = () => {
    return (
        <AppBar component="footer" elevation={1} position="static">
            <Container maxWidth="xl">
                <Grid container>
                    <Grid item xs={3}>
                        <Typography variant="h6">Data Generator Project</Typography>
                    </Grid>
                </Grid>
            </Container>
        </AppBar>
    );
};

export default Footer;
