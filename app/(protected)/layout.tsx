"use client";

import { FC, PropsWithChildren } from "react";
import useSession, { SessionStatus } from "@/hooks/useSession";
import LoadingPage from "@/components/LoadingPage";
import UnauthorizedPage from "./_components/UnauthorizedPage";

const ProtectedLayout: FC<PropsWithChildren> = ({ children }) => {
    const [session] = useSession();
    switch (session.status) {
        case SessionStatus.AUTHENTICATED:
            return <>{children}</>;
        case SessionStatus.UNAUTHENTICATED:
            return <UnauthorizedPage />;
        case SessionStatus.UNKNOWN:
        default:
            return <LoadingPage />;
    }
};

export default ProtectedLayout;
