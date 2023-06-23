import { FC } from "react";
import { Button } from "@mui/material";
import useSession, { logout } from "@/hooks/useSession";
import { useRouter } from "next/navigation";

const LoginButton: FC = () => {
    const router = useRouter();
    const [session, sessionDispatch] = useSession();

    const handleOnSignIn = () => {
        const client_id = "";
        const redirect = "http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fcallback";
        const scope = "openid email profile";

        router.replace(
            `https://accounts.google.com/o/oauth2/v2/auth?client_id=${client_id}&redirect_uri=${redirect}&scope=${scope}&response_type=code&prompt=consent&access_type=offline`
        );
    };

    const handleOnSignOut = () => {
        sessionDispatch(logout());
    };

    if (session.accessToken) {
        return (
            <Button variant="outlined" onClick={handleOnSignOut}>
                sign out
            </Button>
        );
    }

    return (
        <Button variant="outlined" sx={{ my: 2, color: "white", display: "block" }} onClick={handleOnSignIn}>
            sign in
        </Button>
    );
};

export default LoginButton;