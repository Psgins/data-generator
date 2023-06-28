import { FC } from "react";
import Link from "next/link";
import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material";
import HiveIcon from "@mui/icons-material/Hive";
import useSession, { SessionStatus } from "@/hooks/useSession";
import LoginButton from "./LoginButton";

const GeneratorAppBar: FC = () => {
    const [session] = useSession();
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
                        <Button
                            href="/"
                            LinkComponent={Link}
                            sx={{
                                my: 2,
                                color: "white",
                                display: "block",
                            }}
                        >
                            HOME
                        </Button>
                        {session.status === SessionStatus.AUTHENTICATED && (
                            <>
                                <Button
                                    href="/generator"
                                    LinkComponent={Link}
                                    sx={{
                                        my: 2,
                                        color: "white",
                                        display: "block",
                                    }}
                                >
                                    Generator
                                </Button>
                                <Button
                                    href="/template"
                                    LinkComponent={Link}
                                    sx={{
                                        my: 2,
                                        color: "white",
                                        display: "block",
                                    }}
                                >
                                    Template
                                </Button>
                            </>
                        )}
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
