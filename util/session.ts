import { Session, SessionStatus } from "@/hooks/useSession";

const AUTH_PROFILE = "AUTH_PROFILE";
const REFRESH_TOKEN_KEY = "refreshToken";
const ACCESS_TOKEN_KEY = "accessToken";

const isBrowser = typeof document !== "undefined";

export const loadSession = (): Partial<Session> | null => {
    if (isBrowser) {
        const authProfile = localStorage.getItem(AUTH_PROFILE);
        if (authProfile) {
            return JSON.parse(authProfile);
        }
    }
    return null;
};

export const saveSession = (session: Partial<Session>) => {
    if (isBrowser) {
        const authSession = {
            [REFRESH_TOKEN_KEY]: session.refreshToken,
            [ACCESS_TOKEN_KEY]: session.accessToken,
        };

        switch (session.status) {
            case SessionStatus.AUTHENTICATED:
                localStorage.setItem(AUTH_PROFILE, JSON.stringify(authSession));
                break;
            case SessionStatus.UNAUTHENTICATED:
                localStorage.removeItem(AUTH_PROFILE);
                break;
            default:
                break;
        }
    }
};
