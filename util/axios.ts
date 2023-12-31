"use client";

import { useEffect } from "react";
import axios, { InternalAxiosRequestConfig } from "axios";
import useSession, { Session, updateSession } from "@/hooks/useSession";

const axiosDefault = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND,
});

const axiosAuth = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND,
});

export const useAxios = () => {
    return axiosDefault;
};

const useRefreshToken = () => {
    const [session, sessionDispatch] = useSession();
    return async () => {
        const { data } = await axiosDefault.post("/v1/auth/refresh", { refresh_token: session.refreshToken });
        const { id_token } = data;
        sessionDispatch(updateSession({ accessToken: id_token }));
        return id_token;
    };
};

export const useAxiosAuth = () => {
    const [session] = useSession();
    const refresh = useRefreshToken();

    useEffect(() => {
        const requestInterceptorId = axiosAuth.interceptors.request.use(injectToken(session));
        const responseInterceptorId = axiosAuth.interceptors.response.use((response) => response, refreshToken(refresh));
        return () => {
            axiosAuth.interceptors.request.eject(requestInterceptorId);
            axiosAuth.interceptors.response.eject(responseInterceptorId);
        };
    }, [session, refresh]);

    return axiosAuth;
};

const injectToken = (session: Session) => (config: InternalAxiosRequestConfig<any>) => {
    const { headers } = config;
    if (!headers.has("Authorization")) {
        headers.set("Authorization", `Bearer ${session.accessToken}`);
    }
    return config;
};

const refreshToken = (refresh: () => Promise<string>) => async (error: any) => {
    const prevRequest = error.config;
    if (error.response.status === 401 && !prevRequest.retry) {
        prevRequest.retry = true;

        const newAccessToken = await refresh();
        prevRequest.headers.set("Authorization", `Bearer ${newAccessToken}`);

        return axiosAuth(prevRequest);
    }
    return Promise.reject(error);
};
