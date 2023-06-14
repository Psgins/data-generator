import { FC } from "react";
import { NodeProps, Position } from "reactflow";
import { CounterNodeData } from "@/types/generator/nodeData";
import NodeCard from "../flow/NodeCard";
import NodeHandle from "../flow/NodeHandle";

const CounterNodeType: FC<NodeProps<CounterNodeData>> = () => {
    return (
        <NodeCard title="Counter">
            <NodeHandle id="0" type="source" position={Position.Right} />
        </NodeCard>
    );
};

export default CounterNodeType;
