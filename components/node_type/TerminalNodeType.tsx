import { FC } from "react";
import { NodeProps, Position } from "reactflow";
import NodeCard from "../flow/NodeCard";
import NodeHandle from "../flow/NodeHandle";
import { TerminalNodeData } from "@/types/generator/nodeData";

const TerminalNodeType: FC<NodeProps<TerminalNodeData>> = () => {
    return (
        <NodeCard title="OUTPUT">
            <NodeHandle id="1" type="target" position={Position.Left} />
        </NodeCard>
    );
};

export default TerminalNodeType;
