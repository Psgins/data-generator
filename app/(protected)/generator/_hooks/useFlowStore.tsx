import { Dispatch, FC, PropsWithChildren, Reducer, createContext, useContext, useReducer } from "react";

interface FlowStore {
    id: number | null;
}

enum FlowStoreActionType {
    INIT,
    UPDATE,
}

interface FlowStoreAction {
    type: FlowStoreActionType;
    payload: any;
}

export const initialFlowStore: FlowStore = {
    id: null,
};

// --- util function ---

export const initFlowStore = (value?: FlowStore): FlowStoreAction => ({ type: FlowStoreActionType.INIT, payload: value });

export const updateFlowStore = (value: Partial<FlowStore>) => ({ type: FlowStoreActionType.UPDATE, payload: value });

// --- reducer ---

const reducer: Reducer<FlowStore, FlowStoreAction> = (flowStore, action) => {
    switch (action.type) {
        case FlowStoreActionType.INIT:
            return action.payload ? action.payload : initialFlowStore;
        case FlowStoreActionType.UPDATE:
            return { ...flowStore, ...action.payload };
        default:
            return flowStore;
    }
};

// --- context ---

const FlowStoreContext = createContext<FlowStore>(initialFlowStore);
const FlowStoreDispatchContext = createContext<Dispatch<FlowStoreAction>>(() => {
    throw new Error("FlowStoreProvider not found");
});

export const useFlowStore = (): [FlowStore, Dispatch<FlowStoreAction>] => {
    const flowStore = useContext(FlowStoreContext);
    const dispatch = useContext(FlowStoreDispatchContext);
    return [flowStore, dispatch];
};

// --- provider ---

export const FlowStoreProvider: FC<PropsWithChildren> = ({ children }) => {
    const [flowStore, dispatch] = useReducer(reducer, initialFlowStore);
    return (
        <FlowStoreContext.Provider value={flowStore}>
            <FlowStoreDispatchContext.Provider value={dispatch}>{children}</FlowStoreDispatchContext.Provider>
        </FlowStoreContext.Provider>
    );
};
