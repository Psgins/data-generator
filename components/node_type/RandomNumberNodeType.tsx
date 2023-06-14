import { FC } from "react";
import { NodeProps, Position } from "reactflow";
import { RandomNumberNodeData } from "@/types/generator/nodeData";
import NodeCard from "../flow/NodeCard";
import NodeHandle from "../flow/NodeHandle";

const RandomNumberNodeType: FC<NodeProps<RandomNumberNodeData>> = () => {
    return (
        <NodeCard title="Random Number">
            <NodeHandle id="0" type="source" position={Position.Right} />
        </NodeCard>
    );
};

export default RandomNumberNodeType;
