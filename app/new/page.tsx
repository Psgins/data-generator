"use client";

import { FC, PropsWithChildren } from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

import "reactflow/dist/style.css";
import Workspace from "./_components/Workspace";
import { IncomerOrderProvider } from "./_hooks/useIncomerOrder";
import { OptionProvider } from "./_hooks/useOptions";

const Container = styled(Box)(() => ({
    "&": {
        display: "flex",
    },
}));

const WorkspaceSlot = styled(Box)(() => ({
    "&": {
        flexGrow: 1,
    },
}));

const NewLayout: FC<PropsWithChildren<{}>> = ({ children }) => {
    return (
        <Container>
            <WorkspaceSlot>
                <OptionProvider>
                    <IncomerOrderProvider>
                        <Workspace />
                    </IncomerOrderProvider>
                </OptionProvider>
            </WorkspaceSlot>
        </Container>
    );
};

export default NewLayout;
