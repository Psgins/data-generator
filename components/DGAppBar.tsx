import { AppBar, Box, Button, Container, Menu, Toolbar, Typography } from "@mui/material";
import { ReactNode } from "react";
import HiveIcon from "@mui/icons-material/Hive";
import DGLoginButton from "./DGLoginButton";
import Link from "next/link";

interface DGAppBarProps {
    children: ReactNode;
}

const DGAppBar = (props: DGAppBarProps) => {
    const { children } = props;
    return (
        <>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <HiveIcon sx={{ mr: 1 }} />
                        <Typography variant="h6" sx={{ mr: 2 }}>
                            Generator
                        </Typography>
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: "flex",
                                justifyContent: "flex-end",
                            }}
                        >
                            <Link passHref href="/generator">
                                <Button
                                    sx={{
                                        my: 2,
                                        color: "white",
                                        display: "block",
                                    }}
                                >
                                    Generator
                                </Button>
                            </Link>
                            <Link passHref href="/template">
                                <Button
                                    sx={{
                                        my: 2,
                                        color: "white",
                                        display: "block",
                                    }}
                                >
                                    Template
                                </Button>
                            </Link>
                        </Box>
                        <Box sx={{ ml: 1 }}>
                            <DGLoginButton />
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            {children}
        </>
    );
};

export default DGAppBar;
