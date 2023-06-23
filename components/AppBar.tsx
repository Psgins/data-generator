import { FC } from "react";
import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material";
import HiveIcon from "@mui/icons-material/Hive";
import LoginButton from "./LoginButton";
import Link from "next/link";

const GeneratorAppBar: FC = () => {
    return (
        <AppBar elevation={1} position="static">
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
                        <Link passHref href="/">
                            <Button
                                sx={{
                                    my: 2,
                                    color: "white",
                                    display: "block",
                                }}
                            >
                                HOME
                            </Button>
                        </Link>
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
                        <LoginButton />
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default GeneratorAppBar;
