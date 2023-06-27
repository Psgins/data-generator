import { FC } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";

const TemplateSkeleton: FC = () => {
    return (
        <Container sx={{ py: 4 }}>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <Skeleton variant="rounded" height={150} />
                </Grid>
                <Grid item xs={3}>
                    <Skeleton variant="rounded" height={150} />
                </Grid>
                <Grid item xs={3}>
                    <Skeleton variant="rounded" height={150} />
                </Grid>
                <Grid item xs={3}>
                    <Skeleton variant="rounded" height={150} />
                </Grid>
            </Grid>
        </Container>
    );
};

export default TemplateSkeleton;
