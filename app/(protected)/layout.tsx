"use client";

import { FC, PropsWithChildren } from "react";
import useSession, { SessionStatus } from "@/hooks/useSession";

const ProtectedLayout: FC<PropsWithChildren> = ({ children }) => {
    const [session] = useSession();
    switch (session.status) {
        case SessionStatus.UNKNOWN:
            return <>loading</>;
        case SessionStatus.AUTHENTICATED:
            return <>{children}</>;
        case SessionStatus.UNAUTHENTICATED:
        default:
            return <>not allow</>;
    }
};

export default ProtectedLayout;
