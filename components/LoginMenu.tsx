import { FC, MouseEvent, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { ListItemIcon, ListItemText } from "@mui/material";
import GoogleIcon from "./GoogleIcon";

const LoginMenu: FC = () => {
    const router = useRouter();
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement>();

    const handleOnSignIn = useCallback(() => {
        const redirectUri = new URL("https://accounts.google.com/o/oauth2/v2/auth");
        redirectUri.searchParams.append("client_id", process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "");
        redirectUri.searchParams.append("redirect_uri", process.env.NEXT_PUBLIC_GOOGLE_CALLBACK || "");
        redirectUri.searchParams.append("scope", "openid email profile");
        redirectUri.searchParams.append("response_type", "code");
        redirectUri.searchParams.append("prompt", "consent");
        redirectUri.searchParams.append("access_type", "offline");
        router.push(redirectUri.href);
    }, [router]);

    const handleOnMenuClick = useCallback(
        (event: MouseEvent<HTMLButtonElement>) => {
            setAnchorEl(event.currentTarget);
        },
        [setAnchorEl]
    );

    const handleOnMenuClose = useCallback(() => {
        setAnchorEl(undefined);
    }, [setAnchorEl]);

    return (
        <Box>
            <Button variant="outlined" onClick={handleOnMenuClick} sx={{ color: "white", display: "block" }}>
                sign in
            </Button>
            <Menu anchorEl={anchorEl} MenuListProps={{ sx: { width: 225 } }} open={Boolean(anchorEl)} onClose={handleOnMenuClose}>
                <MenuItem onClick={handleOnSignIn}>
                    <ListItemIcon>
                        <GoogleIcon />
                    </ListItemIcon>
                    <ListItemText>Sign in with Google</ListItemText>
                </MenuItem>
            </Menu>
        </Box>
    );
};

export default LoginMenu;
