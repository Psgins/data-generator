import { Edge, Node } from "reactflow";
import { padStart } from "lodash";
import { NodeOption, NodeType } from "@/types/generator";
import { NodeData } from "@/types/generator/nodeData";
import { PaddingOption, RandomNumberOption } from "@/types/generator/nodeOption";
import { TERMINAL_NODE_ID } from "./constants";
import { GeneratorStorage } from "./store";

type SupplyChain<T> = (global: GeneratorStorage, local: GeneratorStorage) => T;

// --- private function ---

const getChildren = (rootNode: Node, nodes: Node[], orders: Record<string, string[]>): Node[] => {
    const order = orders[rootNode.id];
    if (!order) return [];
    return order.map((id) => {
        const node = nodes.find((node) => node.id === id);
        if (!node) throw new Error(`Node[${id}] is missing`);
        return node;
    });
};

// --- generator supplier ---

const createFixedInputSupplier = (node: Node, options: NodeOption<any>[]): SupplyChain<string> => {
    const option = options.find((option) => option.id === node.id);
    if (!option) throw new Error("option is missing");
    return (_global, _local) => option.data;
};

const createRandomNumberSupplier = (node: Node, options: NodeOption<any>[]): SupplyChain<number> => {
    const option = options.find((option) => option.id === node.id);
    if (!option) throw new Error("option is missing");
    return (global, local) => {
        const value = (option as NodeOption<RandomNumberOption>).data.isMemory ? global[node.id] : local[node.id];
        if (typeof value === "undefined") throw new Error("random number is missing from storage");
        if (typeof value !== "number") throw new Error("random number from storage is not a number");
        return value;
    };
};

const createCounterSupplier =
    (node: Node): SupplyChain<number> =>
    (_, local) => {
        const value = local[node.id];
        if (typeof value === "undefined") throw new Error("counter is missing from local storage");
        if (typeof value !== "number") throw new Error("counter from local storage is not a number");
        return value;
    };

const createPaddingSupplier = (node: Node<NodeData>, nodes: Node[], options: NodeOption<any>[], orders: Record<string, string[]>): SupplyChain<string> => {
    const children = getChildren(node, nodes, orders);
    const suppliers = children.map((node) => createSupplier(node, nodes, options, orders));

    const option = options.find((option) => option.id === node.id);
    if (!option) throw new Error("padding option is missing");
    const { data } = option as NodeOption<PaddingOption>;

    const { padChar } = data;
    const padLength = data.length ? parseInt(option.data.length, 10) : 0;

    return (global, local) => {
        const value = suppliers.map((supplier) => supplier(global, local)).join("");
        return padStart(value, padLength, padChar);
    };
};

const createSupplier = (node: Node, nodes: Node[], options: NodeOption<any>[], orders: Record<string, string[]>) => {
    switch (node.type) {
        case NodeType.FIXED_VALUE:
            return createFixedInputSupplier(node, options);
        case NodeType.COUNTER:
            return createCounterSupplier(node);
        case NodeType.RANDOM_NUMBER:
            return createRandomNumberSupplier(node, options);
        case NodeType.PADDING:
            return createPaddingSupplier(node, nodes, options, orders);
        default:
            throw new Error("Unknown node");
    }
};

// --- supply chain ---

export const createSupplyChain = (nodes: Node[], edges: Edge[], options: NodeOption<any>[], orders: Record<string, string[]>): SupplyChain<string> => {
    const terminal = nodes.find((node) => node.id === TERMINAL_NODE_ID);

    if (!terminal) throw new Error("Terminal node not found");

    const children = getChildren(terminal, nodes, orders);
    const suppliers = children.map((node) => createSupplier(node, nodes, options, orders));

    return (global, local) => {
        return suppliers.map((supplier) => supplier(global, local)).join("");
    };
};
