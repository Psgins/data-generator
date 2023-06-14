import { Node, Edge } from "reactflow";

import { NodeData } from "./nodeData";

export enum NodeType {
    TERMINAL = "TERMINAL",
    COUNTER = "COUNTER",
    FIXED_VALUE = "FIXED_VALUE",
    RANDOM_NUMBER = "RANDOM_NUMBER",
    PADDING = "PADDING",
    UNKNOWN = "UNKNOWN",
}

export interface GlobalInfomation {
    nodes: Node<NodeData>[];
    edges: Edge[];
    options: NodeOption<any>[];
    orders: Record<string, string[]>;
}

export interface NodeOption<T> {
    id: string;
    name: string;
    nodeType: NodeType;
    data: T;
}

export type Supplier = (store: Record<string, any>) => string;
