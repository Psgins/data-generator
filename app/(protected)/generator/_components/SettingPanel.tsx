import { FC, useMemo } from "react";
import { Panel, useNodes } from "reactflow";
import GeneratorSettingPanel from "./GeneratorSettingPanel";
import NodeSettingPanel from "./NodeSettingPanel";
import ControllerPanel from "./ControllerPanel";

interface SettingPanelProps {
    selected?: string;
    onClose: () => void;
}

const SettingPanel: FC<SettingPanelProps> = ({ selected, onClose }) => {
    const nodes = useNodes();
    const selectedNode = useMemo(() => nodes.find((node) => node.id === selected), [nodes, selected]);

    return (
        <Panel position="top-right">
            <ControllerPanel />
            {selectedNode ? <NodeSettingPanel node={selectedNode} onClose={onClose} /> : <GeneratorSettingPanel />}
        </Panel>
    );
};

export default SettingPanel;
