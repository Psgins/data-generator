import { FC } from "react";
import { NodeProps, Position } from "reactflow";
import NodeCard from "../flow/NodeCard";
import NodeHandle from "../flow/NodeHandle";
import { PaddingNodeData } from "@/types/generator/nodeData";

const PaddingNodeType: FC<NodeProps<PaddingNodeData>> = () => {
    return (
        <NodeCard title="Padding">
            <NodeHandle id="T0" type="target" position={Position.Left} />
            <NodeHandle id="S0" type="source" position={Position.Right} />
        </NodeCard>
    );
};

export default PaddingNodeType;
