import { Node, XYPosition } from "reactflow";
import { v4 as UUID } from "uuid";
import { NodeOption, NodeType } from "@/types/generator";
import { CounterNodeData, FixedValueNodeData, NodeData, PaddingNodeData, RandomNumberNodeData } from "@/types/generator/nodeData";
import { FixedInputOption, PaddingOption, RandomNumberOption } from "@/types/generator/nodeOption";

export const TERMINAL_NODE_ID = "TERMINAL_NODE";

export const TERMINAL_NODE: Node<undefined> = {
    id: TERMINAL_NODE_ID,
    position: { x: 0, y: 0 },
    type: NodeType.TERMINAL,
    data: undefined,
};

export const TERMINAL_NODE_OPTION: NodeOption<void> = {
    id: TERMINAL_NODE_ID,
    name: "Terminal",
    nodeType: NodeType.TERMINAL,
    data: undefined,
};

export const createNodeInfo = (nodeType: NodeType, position: XYPosition): [Node<NodeData>, NodeOption<any>] => {
    switch (nodeType) {
        case NodeType.COUNTER: {
            const id = UUID();
            const nodeType = NodeType.COUNTER;
            const node: Node<CounterNodeData> = {
                id,
                position,
                type: NodeType.COUNTER,
                data: undefined,
            };
            const option: NodeOption<undefined> = {
                id,
                nodeType,
                name: "Counter",
                data: undefined,
            };
            return [node, option];
        }
        case NodeType.FIXED_VALUE: {
            const id = UUID();
            const nodeType = NodeType.FIXED_VALUE;
            const node: Node<FixedValueNodeData> = {
                id,
                position,
                type: NodeType.FIXED_VALUE,
                data: undefined,
            };
            const option: NodeOption<FixedInputOption> = {
                id,
                nodeType,
                name: "Fixed Value",
                data: "",
            };
            return [node, option];
        }
        case NodeType.RANDOM_NUMBER: {
            const id = UUID();
            const nodeType = NodeType.RANDOM_NUMBER;
            const node: Node<RandomNumberNodeData> = {
                id,
                position,
                type: NodeType.RANDOM_NUMBER,
                data: undefined,
            };
            const option: NodeOption<RandomNumberOption> = {
                id,
                name: "Random Number",
                nodeType,
                data: {
                    isMemory: false,
                },
            };
            return [node, option];
        }
        case NodeType.PADDING: {
            const id = UUID();
            const nodeType = NodeType.PADDING;
            const node: Node<PaddingNodeData> = {
                id,
                position,
                data: undefined,
                type: NodeType.PADDING,
            };
            const option: NodeOption<PaddingOption> = {
                id,
                name: "Padding",
                nodeType,
                data: {
                    padChar: "x",
                    length: "1",
                },
            };
            return [node, option];
        }
        case NodeType.TERMINAL: {
            return [TERMINAL_NODE, TERMINAL_NODE_OPTION];
        }
        default:
            throw new Error("Unknown node type");
    }
};
