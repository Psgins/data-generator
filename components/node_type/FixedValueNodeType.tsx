import { FC } from "react";
import { NodeProps, Position } from "reactflow";
import NodeCard from "../flow/NodeCard";
import NodeHandle from "../flow/NodeHandle";
import { FixedValueNodeData } from "@/types/generator/nodeData";

const FixedValueNodeType: FC<NodeProps<FixedValueNodeData>> = () => {
    return (
        <NodeCard title="Fixed Value">
            <NodeHandle id="0" type="source" position={Position.Right} />
        </NodeCard>
    );
};

export default FixedValueNodeType;
