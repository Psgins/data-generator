import { loadSession, saveSession } from "@/util/session";
import { Dispatch, FC, PropsWithChildren, Reducer, createContext, useContext, useEffect, useReducer } from "react";

// --- type ---

export enum SessionStatus {
    UNKNOWN,
    AUTHENTICATED,
    UNAUTHENTICATED,
}

export interface Session {
    status: SessionStatus;
    accessToken: string | null;
    refreshToken: string | null;
}

enum SessionActionType {
    INIT,
    UPDATE,
}

interface SessionAction {
    type: SessionActionType;
    payload: any;
}

const initialSession: Session = {
    status: SessionStatus.UNKNOWN,
    accessToken: null,
    refreshToken: null,
};

// --- util function ---

export const login = (session: Omit<Session, "status">): SessionAction => ({
    type: SessionActionType.INIT,
    payload: { ...session, status: SessionStatus.AUTHENTICATED },
});

export const logout = (): SessionAction => ({
    type: SessionActionType.INIT,
    payload: { ...initialSession, status: SessionStatus.UNAUTHENTICATED },
});

export const updateSession = (session: Partial<Session>): SessionAction => ({
    type: SessionActionType.UPDATE,
    payload: session,
});

// --- reducer ---
const reducer: Reducer<Session, SessionAction> = (session, action) => {
    switch (action.type) {
        case SessionActionType.INIT:
            return action.payload || initialSession;
        case SessionActionType.UPDATE:
            return { ...session, ...action.payload };
        default:
            return session;
    }
};

// --- context ---

const SessionContext = createContext<Session>(initialSession);
const SessionDispatchContext = createContext<Dispatch<SessionAction>>(() => {
    throw new Error("SessionProvider not found");
});

const useSession = (): [Session, Dispatch<SessionAction>] => {
    const session = useContext(SessionContext);
    const dispatch = useContext(SessionDispatchContext);
    return [session, dispatch];
};

// --- Provider ---

export const SessionProvider: FC<PropsWithChildren> = ({ children }) => {
    const [session, dispatch] = useReducer(reducer, initialSession);

    useEffect(() => {
        const prevSession = loadSession();
        const status = prevSession?.accessToken ? SessionStatus.AUTHENTICATED : SessionStatus.UNAUTHENTICATED;
        dispatch(updateSession({ ...prevSession, status }));
    }, [dispatch]);

    useEffect(() => {
        saveSession(session);
    }, [session]);

    return (
        <SessionContext.Provider value={session}>
            <SessionDispatchContext.Provider value={dispatch}>{children}</SessionDispatchContext.Provider>
        </SessionContext.Provider>
    );
};

export default useSession;
