import { Node } from "reactflow";
import { NodeType } from "../_types/nodeType";
import { NodeOption } from "../_types/nodeOption";

export const TERMINAL_NODE_ID = "TERMINAL_NODE";

export const TERMINAL_NODE: Node = {
    id: TERMINAL_NODE_ID,
    position: { x: 0, y: 0 },
    type: NodeType.TERMINAL,
    data: undefined,
    deletable: false,
};

export const TERMINAL_NODE_OPTION: NodeOption<void> = {
    id: TERMINAL_NODE_ID,
    name: "Terminal",
    nodeType: NodeType.TERMINAL,
    data: undefined,
};
