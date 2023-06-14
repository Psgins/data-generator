import { TERMINAL_NODE_ID } from "@/util/generator";
import { Reducer, createContext, useReducer, PropsWithChildren, FC, Dispatch, useContext } from "react";

type Orders = Record<string, string[]>;

enum OrderActionType {
    REGISTER,
    ADD,
    CHANGE,
}

interface OrderAction {
    type: OrderActionType;
    payload: Record<string, any>;
}

const initialOrders: Orders = {
    [TERMINAL_NODE_ID]: [],
};

const reducer: Reducer<Orders, OrderAction> = (orders, action) => {
    switch (action.type) {
        case OrderActionType.REGISTER:
            return { ...orders, [action.payload.id]: [] };
        case OrderActionType.ADD: {
            const { target, source } = action.payload;
            const targetOrder = orders[target];
            if (!targetOrder) throw Error("target has not been registered");
            return { ...orders, [target]: [...targetOrder, source] };
        }
        case OrderActionType.CHANGE: {
            const { id, orders: newOrders } = action.payload;
            return { ...orders, [id]: newOrders };
        }
        default:
            return initialOrders;
    }
};

// --- util function ---

export const registerOrder = (id: string): OrderAction => ({
    type: OrderActionType.REGISTER,
    payload: { id },
});

export const AddOrder = (source: string, target: string): OrderAction => ({
    type: OrderActionType.ADD,
    payload: { source, target },
});

export const changeOrder = (id: string, orders: string[]): OrderAction => ({
    type: OrderActionType.CHANGE,
    payload: { id, orders },
});

// --- context ---

const OrderContext = createContext<Orders | null>(null);
const OrderDispatchContext = createContext<Dispatch<OrderAction> | null>(null);

const useIncomerOrder = (): [Orders, Dispatch<OrderAction>] => {
    const orders = useContext(OrderContext);
    const dispatch = useContext(OrderDispatchContext);
    if (!orders || !dispatch) throw Error("IncomerOrderProvider not found");
    return [orders, dispatch];
};

// --- provider ---

export const IncomerOrderProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
    const [orders, dispatch] = useReducer(reducer, initialOrders);
    return (
        <OrderContext.Provider value={orders}>
            <OrderDispatchContext.Provider value={dispatch}>{children}</OrderDispatchContext.Provider>
        </OrderContext.Provider>
    );
};

export default useIncomerOrder;
