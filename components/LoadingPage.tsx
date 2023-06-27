import { FC } from "react";
import { Container, Typography } from "@mui/material";
import LoadingSpinnerIcon from "@/components/LoadingSpinnerIcon";

const LoadingPage: FC = () => {
    return (
        <Container disableGutters maxWidth={false} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <LoadingSpinnerIcon color="action" />
            <Typography color="white" variant="h5" sx={{ ml: 0.5 }}>
                Authenticating...
            </Typography>
        </Container>
    );
};

export default LoadingPage;
