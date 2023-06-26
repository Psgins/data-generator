import { ComponentType } from "react";
import { NodeProps } from "reactflow";
import TerminalNodeType from "../_components/node_card/TerminalNodeType";
import CounterNodeType from "../_components/node_card/CounterNodeType";
import FixedValueNodeType from "../_components/node_card/FixedValueNodeType";
import RandomNumberNodeType from "../_components/node_card/RandomNumberNodeType";
import PaddingNodeType from "../_components/node_card/PaddingNodeType";
import { NodeType } from "../_types/nodeType";

const customNodeType: Record<string, ComponentType<NodeProps>> = {
    [NodeType.TERMINAL]: TerminalNodeType,
    [NodeType.COUNTER]: CounterNodeType,
    [NodeType.FIXED_VALUE]: FixedValueNodeType,
    [NodeType.RANDOM_NUMBER]: RandomNumberNodeType,
    [NodeType.PADDING]: PaddingNodeType,
};

export default customNodeType;
