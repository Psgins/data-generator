import { NodeType } from "./nodeType";

// --- base ---

export interface NodeOption<T> {
    id: string;
    name: string;
    nodeType: NodeType;
    data: T;
}

// --- option ---

export type FixedInputOption = string;

export interface RandomNumberOption {
    isMemory: boolean;
    allowNumber: boolean[];
}

export interface PaddingOption {
    padChar: string;
    length: string;
}
