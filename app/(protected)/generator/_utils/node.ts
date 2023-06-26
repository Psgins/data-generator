import { Node, XYPosition } from "reactflow";
import { v4 as UUID } from "uuid";
import { NodeType } from "../_types/nodeType";
import { FixedInputOption, NodeOption, PaddingOption, RandomNumberOption } from "../_types/nodeOption";
import { TERMINAL_NODE, TERMINAL_NODE_OPTION } from "../_constants/terminalNode";

export const getNodeNameByNodeType = (type: Node["type"]): string => {
    switch (type) {
        case NodeType.TERMINAL:
            return "Output";
        case NodeType.COUNTER:
            return "Counter";
        case NodeType.FIXED_VALUE:
            return "Fixed Value";
        case NodeType.PADDING:
            return "Padding";
        case NodeType.RANDOM_NUMBER:
            return "Random Number";
        default:
            return "UNKNOWN";
    }
};

export const createNodeInfo = (nodeType: NodeType, position: XYPosition): [Node, NodeOption<any>] => {
    switch (nodeType) {
        case NodeType.COUNTER: {
            const id = `CNT_${UUID()}`;
            const nodeType = NodeType.COUNTER;
            const node: Node = {
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
            const id = `FIX_${UUID()}`;
            const nodeType = NodeType.FIXED_VALUE;
            const node: Node = {
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
            const id = `RNUM_${UUID()}`;
            const nodeType = NodeType.RANDOM_NUMBER;
            const node: Node = {
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
                    allowNumber: [true, true, true, true, true, true, true, true, true, true],
                },
            };
            return [node, option];
        }
        case NodeType.PADDING: {
            const id = `PAD_${UUID()}`;
            const nodeType = NodeType.PADDING;
            const node: Node = {
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
