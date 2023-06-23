"use client";

import { FC, PropsWithChildren } from "react";
import { Box, styled } from "@mui/material";
import AppBar from "./AppBar";
import Footer from "./Footer";

const RootContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: theme.palette.background.default,
}));

const ChildrenContainer = styled(Box)(() => ({
    display: "flex",
    flexGrow: 1,
}));

const AppLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <RootContainer>
            <AppBar />
            <ChildrenContainer>{children}</ChildrenContainer>
            <Footer />
        </RootContainer>
    );
};

export default AppLayout;
