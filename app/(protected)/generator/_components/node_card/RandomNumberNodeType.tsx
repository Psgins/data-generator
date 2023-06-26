import { FC } from "react";
import { NodeProps, Position } from "reactflow";
import NodeCard from "../NodeCard";
import NodeHandle from "../NodeHandle";

const RandomNumberNodeType: FC<NodeProps> = () => {
    return (
        <NodeCard title="Random Number">
            <NodeHandle id="0" type="source" position={Position.Right} />
        </NodeCard>
    );
};

export default RandomNumberNodeType;
