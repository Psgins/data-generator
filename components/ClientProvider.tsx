"use client";

import { FC, PropsWithChildren } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "@/util/theme";
import { SessionProvider } from "next-auth/react";

const ClientProvider: FC<PropsWithChildren> = ({ children }) => {
    return (
        <>
            <CssBaseline />
            <ThemeProvider theme={theme}>
                <SessionProvider>{children}</SessionProvider>
            </ThemeProvider>
        </>
    );
};

export default ClientProvider;
