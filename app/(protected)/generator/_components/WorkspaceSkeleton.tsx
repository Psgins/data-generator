import { FC } from "react";
import Container from "@mui/material/Container";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

const WorkspaceSkeleton: FC = () => {
    return (
        <Container disableGutters maxWidth={false} sx={{ p: 2, display: "flex", justifyContent: "space-between" }}>
            <Box>
                <Skeleton variant="rounded" width={80} height={200} />
            </Box>
            <Box sx={{ display: "flex", my: 4 }}>
                <Skeleton variant="rounded" width={150} height={100} sx={{ mx: 2 }} />
                <Skeleton variant="rounded" width={150} height={100} sx={{ mx: 2 }} />
                <Skeleton variant="rounded" width={150} height={100} sx={{ mx: 2 }} />
            </Box>
            <Box>
                <Skeleton variant="rounded" width={300} height={40} />
                <Skeleton variant="rounded" width={300} height={200} sx={{ mt: 2 }} />
            </Box>
        </Container>
    );
};

export default WorkspaceSkeleton;
