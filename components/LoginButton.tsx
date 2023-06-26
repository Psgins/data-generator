import { FC } from "react";
import { Button } from "@mui/material";
import useSession, { SessionStatus, logout } from "@/hooks/useSession";
import { useRouter } from "next/navigation";
import LoadingSpinnerIcon from "./LoadingSpinnerIcon";

const LoginButton: FC = () => {
    const router = useRouter();
    const [session, sessionDispatch] = useSession();

    const handleOnSignIn = () => {
        const client_id = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
        const redirect = encodeURIComponent(process.env.NEXT_PUBLIC_GOOGLE_CALLBACK || "");
        const scope = "openid email profile";
        router.replace(
            `https://accounts.google.com/o/oauth2/v2/auth?client_id=${client_id}&redirect_uri=${redirect}&scope=${scope}&response_type=code&prompt=consent&access_type=offline`
        );
    };

    const handleOnSignOut = () => {
        sessionDispatch(logout());
    };

    switch (session.status) {
        case SessionStatus.AUTHENTICATED:
            return (
                <Button variant="outlined" onClick={handleOnSignOut}>
                    sign out
                </Button>
            );
        case SessionStatus.UNAUTHENTICATED:
            return (
                <Button variant="outlined" sx={{ my: 2, color: "white", display: "block" }} onClick={handleOnSignIn}>
                    sign in
                </Button>
            );
        case SessionStatus.UNKNOWN:
        default:
            return (
                <Button variant="outlined">
                    <LoadingSpinnerIcon />
                    Loading
                </Button>
            );
    }
};

export default LoginButton;
