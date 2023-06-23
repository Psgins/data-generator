import { Session } from "@/hooks/useSession";
import { browser } from "process";

const REFRESH_TOKEN_KEY = "refresh_token";
const ACCESS_TOKEN_KEY = "access_token";

const isBrowser = typeof document !== "undefined";

export const loadSession = (): Partial<Session> | null => {
    if (isBrowser) {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
        const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
        return { refreshToken, accessToken };
    }
    return null;
};

export const saveSession = (session: Partial<Session>) => {
    if (isBrowser) {
        if (session.refreshToken) {
            localStorage.setItem(REFRESH_TOKEN_KEY, session.refreshToken);
        } else {
            localStorage.removeItem(REFRESH_TOKEN_KEY);
        }
        if (session.accessToken) {
            localStorage.setItem(ACCESS_TOKEN_KEY, session.accessToken);
        } else {
            localStorage.removeItem(ACCESS_TOKEN_KEY);
        }
    }
};
