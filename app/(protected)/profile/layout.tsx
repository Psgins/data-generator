"use client";

import { ReactNode } from "react";
import { Container } from "@mui/material";

interface ProfileLayoutProps {
    children: ReactNode;
}

const ProfileLayout = ({ children }: ProfileLayoutProps) => {
    return <Container maxWidth="xl">{ children }</Container>
}

export default ProfileLayout;