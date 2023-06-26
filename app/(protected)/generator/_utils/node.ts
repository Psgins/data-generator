import { Node } from "reactflow";
import { NodeType } from "../_types/nodeType";

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
