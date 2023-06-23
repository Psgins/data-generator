import { FC } from "react";
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

const AppFooter: FC = () => {
    return (
        <Paper elevation={1}>
            <Container maxWidth="xl" sx={{ py: 2 }}>
                <Grid container>
                    <Grid item xs={3}>
                        <Typography variant="h6">Data Generator Project</Typography>
                        <Typography variant="body2">Demo Project</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <MailOutlineIcon />
                            <Typography variant="h6" sx={{ ml: 1 }}>
                                Contact
                            </Typography>
                        </Box>
                        <Typography variant="body2">Peerachat Uengpattanakit</Typography>
                        <Typography variant="body2">peerachat@gmail.com</Typography>
                        <Typography variant="body2">(+66)81-967-6274</Typography>
                    </Grid>
                </Grid>
            </Container>
        </Paper>
    );
};

export default AppFooter;
