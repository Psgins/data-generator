import { FC } from "react";
import { NodeProps, Position } from "reactflow";
import NodeCard from "../NodeCard";
import NodeHandle from "../NodeHandle";

const CounterNodeType: FC<NodeProps> = () => {
    return (
        <NodeCard title="Counter">
            <NodeHandle id="0" type="source" position={Position.Right} />
        </NodeCard>
    );
};

export default CounterNodeType;
