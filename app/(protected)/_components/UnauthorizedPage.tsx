import { FC } from "react";
import Link from "next/link";
import { Button, Container, Typography } from "@mui/material";

const UnauthorizedPage: FC = () => {
    return (
        <Container sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <img width={64} height={64} src="/images/icons8-no-access-64.png" />
            <Typography color="whitesmoke" variant="h5" sx={{ mt: 1 }}>
                Oops!
            </Typography>
            <Typography color="whitesmoke" variant="body1">
                This section has been protected
            </Typography>
            <Button color="primary" href="/" LinkComponent={Link} variant="outlined" size="small" sx={{ mt: 2 }}>
                Home
            </Button>
        </Container>
    );
};

export default UnauthorizedPage;
