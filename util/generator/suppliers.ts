import { Node } from "reactflow";
import { padStart } from "lodash";
import { GlobalInfomation, NodeOption, NodeType, Supplier } from "@/types/generator";
import { NodeData } from "@/types/generator/nodeData";
import { FixedInputOption, PaddingOption, RandomNumberOption } from "@/types/generator/nodeOption";

// --- private function ---

const getSuppliers = (rootNode: Node<NodeData>, info: GlobalInfomation) => {
    const order = info.orders[rootNode.id];
    if (!order) return [];
    return order
        .map((id) => {
            const node = info.nodes.find((nd) => nd.id === id);
            if (!node) throw new Error(`Node[${id}] is missing`);
            return node;
        })
        .map((node) => createSupplyChian(node, info));
};

// --- generator supplier ---

const createFixedInputSupplier =
    (option: NodeOption<FixedInputOption>): Supplier =>
    () =>
        option.data;

const createRandomNumberSupplier =
    (option: NodeOption<RandomNumberOption>): Supplier =>
    (store) => {
        if (option.data.isMemory) {
            const memory = store[option.id];
            if (typeof memory !== "undefined") {
                return memory;
            }
            store[option.id] = `${Math.floor(Math.random() * 3)}`;
            return store[option.id];
        }
        return `${Math.floor(Math.random() * 3)}`;
    };

const createCounterSupplier =
    (option: NodeOption<undefined>): Supplier =>
    (store) => {
        if (!store[option.id]) {
            store[option.id] = 0;
        }
        store[option.id] = store[option.id] + 1;
        return `${store[option.id]}`;
    };

// --- intermediate supplier ---

const createTerminalSupplier = (node: Node<NodeData>, info: GlobalInfomation): Supplier => {
    const suppliers = getSuppliers(node, info);
    return (store) => {
        return suppliers.map((supplier) => supplier(store)).join("");
    };
};

const createPaddingSupplier = (node: Node<NodeData>, info: GlobalInfomation): Supplier => {
    const suppliers = getSuppliers(node, info);
    const option = info.options.find((option) => option.id === node.id) as NodeOption<PaddingOption> | undefined;

    if (!option) throw new Error("padding option is missing");

    const { padChar } = option.data;
    const padLength = option.data.length ? parseInt(option.data.length, 10) : 0;

    return (store) => {
        const value = suppliers.map((supplier) => supplier(store)).join("");
        return padStart(value, padLength, padChar);
    };
};

// --- supply chain ---

export const createSupplyChian = (node: Node<NodeData>, info: GlobalInfomation): Supplier => {
    const { id, type: nodeType } = node;

    const option = info.options.find((opt) => opt.id === id);

    switch (nodeType) {
        case NodeType.TERMINAL:
            return createTerminalSupplier(node, info);
        case NodeType.COUNTER:
            return createCounterSupplier(option as NodeOption<undefined>);
        case NodeType.FIXED_VALUE:
            return createFixedInputSupplier(option as NodeOption<FixedInputOption>);
        case NodeType.RANDOM_NUMBER:
            return createRandomNumberSupplier(option as NodeOption<RandomNumberOption>);
        case NodeType.PADDING:
            return createPaddingSupplier(node, info);
        default:
            throw new Error("Unknown node");
    }
};
