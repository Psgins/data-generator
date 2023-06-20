import { NodeData } from "@/types/generator/nodeData";
import { FC, useMemo } from "react";
import { Panel, useNodes } from "reactflow";
import GeneratorSettingPanel from "./GeneratorSettingPanel";
import NodeSettingPanel from "./NodeSettingPanel";
import ControllerPanel from "./ControllerPanel";

interface SettingPanelProps {
    id?: string;
    onClose: () => void;
}

const SettingPanel: FC<SettingPanelProps> = ({ id, onClose }) => {
    const nodes = useNodes<NodeData>();
    const selectedNode = useMemo(() => nodes.find((node) => node.id === id), [nodes, id]);

    return (
        <Panel position="top-right">
            <ControllerPanel />
            {selectedNode ? <NodeSettingPanel node={selectedNode} onClose={onClose} /> : <GeneratorSettingPanel />}
        </Panel>
    );
};

export default SettingPanel;
