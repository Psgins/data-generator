"use client";

import "reactflow/dist/style.css";

import { FC, PropsWithChildren, useMemo } from "react";
import { ReactFlowProvider } from "reactflow";
import { InfoProvider } from "./_hooks/useInfo";
import { OptionProvider } from "./_hooks/useOptions";
import { IncomerOrderProvider } from "./_hooks/useIncomerOrder";
import { useSession } from "next-auth/react";

const GeneraterLayout: FC<PropsWithChildren> = ({ children }) => {
    const { data: session } = useSession();

    const authenticating = useMemo(() => typeof session === "undefined", [session]);

    return authenticating ? (
        <>authenticating</>
    ) : (
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
