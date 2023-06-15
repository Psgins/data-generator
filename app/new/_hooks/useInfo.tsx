import { Dispatch, FC, PropsWithChildren, Reducer, createContext, useContext, useReducer } from "react";

// --- type ---

enum InfoActionType {
    UPDATE,
}

export interface Info {
    name: string;
    iteration: string;
}

interface InfoAction {
    type: InfoActionType;
    payload: any;
}

const initValue: Info = {
    name: "Untitled",
    iteration: "1",
};

// --- util function ---

export const infoUpdate = (change: Partial<Info>) => ({
    type: InfoActionType.UPDATE,
    payload: change,
});

// --- reducer ---

const reducer: Reducer<Info, InfoAction> = (info, action) => {
    switch (action.type) {
        case InfoActionType.UPDATE:
            return { ...info, ...action.payload };
        default:
            return info;
    }
};

// --- context ---

const InfoContext = createContext<Info | null>(null);
const InfoDispatchContext = createContext<Dispatch<InfoAction> | null>(null);

const useInfo = (): [Info, Dispatch<InfoAction>] => {
    const info = useContext(InfoContext);
    const dispatch = useContext(InfoDispatchContext);
    if (!info || !dispatch) throw new Error("InfoProvider not found");
    return [info, dispatch];
};

// --- provider ---

export const InfoProvider: FC<PropsWithChildren> = ({ children }) => {
    const [info, dispatch] = useReducer(reducer, initValue);
    return (
        <InfoContext.Provider value={info}>
            <InfoDispatchContext.Provider value={dispatch}>{children}</InfoDispatchContext.Provider>
        </InfoContext.Provider>
    );
};

export default useInfo;
