import { FC, PropsWithChildren, createContext, useReducer, Reducer, Dispatch, useContext } from "react";
import { NodeOption } from "@/types/generator";
import { TERMINAL_NODE_OPTION } from "@/util/generator";

// --- type ---

type Options = NodeOption<any>[];

enum OptionActionType {
    ADD,
    CHANGE,
}

interface OptionAction {
    type: OptionActionType;
    payload: any;
}

const initialOption: Options = [TERMINAL_NODE_OPTION];

// --- util function

export const addOption = (option: NodeOption<any>): OptionAction => ({
    type: OptionActionType.ADD,
    payload: option,
});

export const changeOption = (option: NodeOption<any>): OptionAction => ({
    type: OptionActionType.CHANGE,
    payload: option,
});

// --- reducer ---

const optionReducer: Reducer<Options, OptionAction> = (options, action) => {
    switch (action.type) {
        case OptionActionType.ADD:
            return [...options, action.payload];
        case OptionActionType.CHANGE:
            return options.map((option) => (option.id === action.payload.id ? action.payload : option));
        default:
            return options;
    }
};

// --- context ---

const OptionContext = createContext<any[] | null>(null);
const OptionDispatchContext = createContext<Dispatch<OptionAction> | null>(null);

const useOption = (): [Options, Dispatch<OptionAction>] => {
    const orders = useContext(OptionContext);
    const dispatch = useContext(OptionDispatchContext);
    if (!orders || !dispatch) throw new Error("OptionProvider not found");
    return [orders, dispatch];
};

// --- provider ---

export const OptionProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
    const [options, dispatch] = useReducer(optionReducer, initialOption);
    return (
        <OptionContext.Provider value={options}>
            <OptionDispatchContext.Provider value={dispatch}>{children}</OptionDispatchContext.Provider>
        </OptionContext.Provider>
    );
};

export default useOption;
