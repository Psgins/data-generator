import { FC } from "react";
import { NodeProps, Position } from "reactflow";
import NodeCard from "../NodeCard";
import NodeHandle from "../NodeHandle";

const PaddingNodeType: FC<NodeProps> = () => {
    return (
        <NodeCard title="Padding">
            <NodeHandle id="T0" type="target" position={Position.Left} />
            <NodeHandle id="S0" type="source" position={Position.Right} />
        </NodeCard>
    );
};

export default PaddingNodeType;
