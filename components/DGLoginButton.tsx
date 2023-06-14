import { Button } from "@mui/material";
import { FC } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

const DGLoginButton: FC = () => {
    const { data: session } = useSession();
    const handleOnSignIn = () => {
        signIn();
    }

    const handleOnSignOut = () => {
        signOut();
    }

    if (session) {
        return <Button variant="outlined" onClick={handleOnSignOut}>sign out</Button>
    }

    return (
        <Button variant='outlined' sx={{ my: 2, color: "white", display: "block" }} onClick={handleOnSignIn}>sign in</Button>
    );
}

export default DGLoginButton;