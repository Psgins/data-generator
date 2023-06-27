"use client";

import { FC, PropsWithChildren } from "react";
import { SnackbarProvider } from "notistack";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { SessionProvider } from "@/hooks/useSession";
import theme from "@/util/theme";

const ClientProvider: FC<PropsWithChildren> = ({ children }) => {
    return (
        <>
            <CssBaseline />
            <ThemeProvider theme={theme}>
                <SnackbarProvider anchorOrigin={{ vertical: "top", horizontal: "center" }} maxSnack={3}>
                    <SessionProvider>{children}</SessionProvider>
                </SnackbarProvider>
            </ThemeProvider>
        </>
    );
};

export default ClientProvider;
