"use client";

import "reactflow/dist/style.css";

import { FC, PropsWithChildren } from "react";
import { ReactFlowProvider } from "reactflow";
import { InfoProvider } from "./_hooks/useInfo";
import { OptionProvider } from "./_hooks/useOptions";
import { IncomerOrderProvider } from "./_hooks/useIncomerOrder";

const GeneraterLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <InfoProvider>
            <OptionProvider>
                <IncomerOrderProvider>
                    <ReactFlowProvider>{children}</ReactFlowProvider>
                </IncomerOrderProvider>
            </OptionProvider>
        </InfoProvider>
    );
};

export default GeneraterLayout;
