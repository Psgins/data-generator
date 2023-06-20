import { ComponentType } from "react";
import { NodeProps } from "reactflow";
import { NodeType } from "@/types/generator";
import TerminalNodeType from "@/components/node_type/TerminalNodeType";
import CounterNodeType from "@/components/node_type/CounterNodeType";
import FixedValueNodeType from "@/components/node_type/FixedValueNodeType";
import RandomNumberNodeType from "@/components/node_type/RandomNumberNodeType";
import PaddingNodeType from "@/components/node_type/PaddingNodeType";

const customNodeType: Record<string, ComponentType<NodeProps>> = {
    [NodeType.TERMINAL]: TerminalNodeType,
    [NodeType.COUNTER]: CounterNodeType,
    [NodeType.FIXED_VALUE]: FixedValueNodeType,
    [NodeType.RANDOM_NUMBER]: RandomNumberNodeType,
    [NodeType.PADDING]: PaddingNodeType,
};

export default customNodeType;
