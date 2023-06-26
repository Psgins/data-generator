import { FC } from "react";
import { NodeProps, Position } from "reactflow";
import NodeCard from "../NodeCard";
import NodeHandle from "../NodeHandle";

const FixedValueNodeType: FC<NodeProps> = () => {
    return (
        <NodeCard title="Fixed Value">
            <NodeHandle id="0" type="source" position={Position.Right} />
        </NodeCard>
    );
};

export default FixedValueNodeType;
