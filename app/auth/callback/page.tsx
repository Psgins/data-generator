"use client";

import useSession, { login } from "@/hooks/useSession";
import { useAxios } from "@/util/axios";
import { useSearchParams, useRouter } from "next/navigation";
import { FC, useEffect } from "react";

const CallbackPage: FC = () => {
    const axios = useAxios();
    const router = useRouter();
    const params = useSearchParams();
    const [_session, sessionDispatch] = useSession();

    useEffect(() => {
        getToken();
    }, []);

    const getToken = async () => {
        const { data: responseData } = await axios.post("/v1/auth/token", { code: params.get("code") });
        const { id_token: access_token, refresh_token } = responseData;
        sessionDispatch(login({ accessToken: access_token, refreshToken: refresh_token }));
        router.replace("/");
    };

    return (
        <>
            code: {params.get("code")}
            <br />
            scope: {params.get("scope")}
        </>
    );
};

export default CallbackPage;
