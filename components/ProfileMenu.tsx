import { FC, useCallback, useMemo, useState, MouseEvent } from "react";
import { Avatar, Box, ButtonBase, Divider, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import useSession, { logout } from "@/hooks/useSession";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

interface Profile {
    picture: string;
}

const ProfileMenu: FC = () => {
    const [session, sessionDispatch] = useSession();
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement>();

    const profile: Partial<Profile> = useMemo(() => {
        try {
            if (session.accessToken) {
                const segment = session.accessToken.split(".");
                if (segment[1]) {
                    const claimText = atob(segment[1]);
                    const claim = JSON.parse(claimText);
                    return claim;
                }
            }
        } catch (error) {
            console.error(error);
        }
        // fallback
        return {};
    }, [session]);

    const handleOnProfileClick = useCallback(
        (event: MouseEvent<HTMLButtonElement>) => {
            setAnchorEl(event.currentTarget);
        },
        [setAnchorEl]
    );

    const handleOnMenuClose = useCallback(() => {
        setAnchorEl(undefined);
    }, [setAnchorEl]);

    const handleOnLogout = useCallback(() => {
        sessionDispatch(logout());
        handleOnMenuClose();
    }, [handleOnMenuClose, sessionDispatch]);

    return (
        <Box>
            <ButtonBase centerRipple onClick={handleOnProfileClick}>
                <Avatar alt="test" src={profile.picture} />
            </ButtonBase>
            <Menu anchorEl={anchorEl} MenuListProps={{ sx: { width: 225 } }} open={Boolean(anchorEl)} onClose={handleOnMenuClose}>
                <MenuItem>
                    <ListItemIcon>
                        <PersonOutlineOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText>Profile</ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleOnLogout}>
                    <ListItemIcon>
                        <LogoutOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText>Logout</ListItemText>
                </MenuItem>
            </Menu>
        </Box>
    );
};

export default ProfileMenu;
