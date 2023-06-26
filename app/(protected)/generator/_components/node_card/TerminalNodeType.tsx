import { FC } from "react";
import { NodeProps, Position } from "reactflow";
import NodeCard from "../NodeCard";
import NodeHandle from "../NodeHandle";

const TerminalNodeType: FC<NodeProps> = () => {
    return (
        <NodeCard title="OUTPUT">
            <NodeHandle id="1" type="target" position={Position.Left} />
        </NodeCard>
    );
};

export default TerminalNodeType;
