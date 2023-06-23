"use client";

import { FC, PropsWithChildren } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { SessionProvider } from "@/hooks/useSession";
import theme from "@/util/theme";

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
