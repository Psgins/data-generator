import { FC, PropsWithChildren, createContext, useReducer, Reducer, Dispatch, useContext } from "react";
import { NodeOption } from "@/types/generator";
import { TERMINAL_NODE_OPTION } from "@/util/generator";

// --- type ---

type Options = NodeOption<any>[];

enum OptionActionType {
    INIT,
    ADD,
    CHANGE,
    DELETE,
}

interface OptionAction {
    type: OptionActionType;
    payload: any;
}

export const initialOption: Options = [TERMINAL_NODE_OPTION];

// --- util function

export const initOption = (options: Options): OptionAction => ({
    type: OptionActionType.INIT,
    payload: options,
});

export const addOption = (option: NodeOption<any>): OptionAction => ({
    type: OptionActionType.ADD,
    payload: option,
});

export const changeOption = (option: NodeOption<any>): OptionAction => ({
    type: OptionActionType.CHANGE,
    payload: option,
});

export const deleteOption = (ids: string[]): OptionAction => ({
    type: OptionActionType.DELETE,
    payload: ids,
});

// --- reducer ---

const optionReducer: Reducer<Options, OptionAction> = (options, action) => {
    switch (action.type) {
        case OptionActionType.INIT:
            return action.payload;
        case OptionActionType.ADD:
            return [...options, action.payload];
        case OptionActionType.CHANGE:
            return options.map((option) => (option.id === action.payload.id ? action.payload : option));
        case OptionActionType.DELETE:
            return options.filter((option) => !(action.payload as string[]).includes(option.id));
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
