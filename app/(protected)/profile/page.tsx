"use client";

import { useAxiosAuth } from "@/util/axios";
import { Button } from "@mui/material";

const Profile = (props: any) => {

    const axios = useAxiosAuth();

    const loadProfile = async () => {
        const resp = await axios.get("/profile");
        console.log(resp)
    }

    return <Button variant="contained" onClick={loadProfile}>profile</Button>
}

export default Profile;