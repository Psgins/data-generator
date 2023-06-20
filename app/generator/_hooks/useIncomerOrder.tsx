import { omit } from "lodash";
import { TERMINAL_NODE_ID } from "@/util/generator";
import { Reducer, createContext, useReducer, PropsWithChildren, FC, Dispatch, useContext } from "react";
import { Edge } from "reactflow";

type Orders = Record<string, string[]>;

enum OrderActionType {
    INIT,
    ADD,
    CHANGE,
    DELETE_FROM_NODE,
    DELETE_NODE,
}

interface OrderAction {
    type: OrderActionType;
    payload: Record<string, any>;
}

export const initialOrders: Orders = {
    [TERMINAL_NODE_ID]: [],
};

const reducer: Reducer<Orders, OrderAction> = (orders, action) => {
    switch (action.type) {
        case OrderActionType.INIT:
            return action.payload;
        case OrderActionType.ADD:
            return { ...orders, [action.payload.id]: [] };
        case OrderActionType.CHANGE: {
            const { id, orders: newOrders } = action.payload;
            return { ...orders, [id]: newOrders };
        }
        case OrderActionType.DELETE_FROM_NODE: {
            const updatedOrders = (action.payload as Edge[]).reduce((collection, { source, target }) => {
                const order = orders[target];
                return { ...collection, [target]: order.filter((id) => id !== source) };
            }, {});
            return { ...orders, ...updatedOrders };
        }
        case OrderActionType.DELETE_NODE: {
            return omit(orders, action.payload as string[]);
        }
        default:
            return initialOrders;
    }
};

// --- util function ---

export const initOrder = (orders: Orders): OrderAction => ({
    type: OrderActionType.INIT,
    payload: orders,
});

export const addOrder = (id: string): OrderAction => ({
    type: OrderActionType.ADD,
    payload: { id },
});

export const changeOrder = (id: string, orders: string[]): OrderAction => ({
    type: OrderActionType.CHANGE,
    payload: { id, orders },
});

export const deleteNodeOrder = (ids: string[]): OrderAction => ({
    type: OrderActionType.DELETE_NODE,
    payload: ids,
});

export const deleteOrderFromNode = (edges: Edge[]): OrderAction => ({
    type: OrderActionType.DELETE_FROM_NODE,
    payload: edges,
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
