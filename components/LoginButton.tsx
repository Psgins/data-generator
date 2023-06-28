import { FC } from "react";
import { Button } from "@mui/material";
import useSession, { SessionStatus } from "@/hooks/useSession";
import LoadingSpinnerIcon from "./LoadingSpinnerIcon";
import LoginMenu from "./LoginMenu";
import ProfileMenu from "./ProfileMenu";

const LoginButton: FC = () => {
    const [session] = useSession();

    switch (session.status) {
        case SessionStatus.AUTHENTICATED:
            return <ProfileMenu />;
        case SessionStatus.UNAUTHENTICATED:
            return <LoginMenu />;
        case SessionStatus.UNKNOWN:
        default:
            return (
                <Button startIcon={<LoadingSpinnerIcon />} variant="outlined">
                    Loading
                </Button>
            );
    }
};

export default LoginButton;
