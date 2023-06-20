"use client";

import { FC, PropsWithChildren } from "react";
import { useSession } from "next-auth/react";

const ProtectedLayout: FC<PropsWithChildren> = ({ children }) => {
    const { status } = useSession();
    switch (status) {
        case "loading":
            return <>loading</>;
        case "authenticated":
            return <>{children}</>;
        case "unauthenticated":
        default:
            return <>not allow</>;
    }
};

export default ProtectedLayout;
