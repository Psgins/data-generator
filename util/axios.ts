"use client";

import axios, { InternalAxiosRequestConfig } from "axios";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const axiosDefault = axios.create({
    baseURL: "http://localhost:8080",
});

const axiosAuth = axios.create({
    baseURL: "http://localhost:8080",
});

export const useAxios = () => {
    return axiosDefault;
};

export const useAxiosAuth = () => {
    const { data: session } = useSession();

    useEffect(() => {
        const injectToken = (config: InternalAxiosRequestConfig<any>) => {
            const { headers } = config;
            if (!headers.has("Authorization")) {
                headers.set("Authorization", `Bearer ${session?.accessToken}`);
            }
            return config;
        };
        const interceptorId = axiosAuth.interceptors.request.use(injectToken);
        return () => {
            axiosAuth.interceptors.request.eject(interceptorId);
        };
    }, [session]);

    return axiosAuth;
};
