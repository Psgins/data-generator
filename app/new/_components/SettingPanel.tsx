import { FC, useMemo } from "react";
import { Panel, useEdges, useNodes } from "reactflow";
import { Paper, Typography, Grid, Tooltip } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { NodeOption, NodeType } from "@/types/generator";
import NodeOptionDecision from "./NodeOptionDecision";
import IncomerOrderOption from "./IncomerOrderOption";
import useOption from "../_hooks/useOptions";
import { NodeData } from "@/types/generator/nodeData";

interface SettingPanelProps {
    id?: string;
}

const SettingPanel: FC<SettingPanelProps> = ({ id }) => {
    const nodes = useNodes<NodeData>();
    const edges = useEdges();

    const selectedNode = nodes.find((node) => node.id === id);

    const nodeType = useMemo((): NodeType => {
        if (!selectedNode) return NodeType.UNKNOWN;
        const { type: nodeType } = selectedNode;
        if (typeof nodeType === "undefined") return NodeType.UNKNOWN;
        return NodeType[nodeType as keyof typeof NodeType];
    }, [selectedNode]);

    return (
        <Panel position="top-right">
            {id && selectedNode && (
                <Paper sx={{ width: 300 }}>
                    <Typography sx={{ textAlign: "center" }} variant="body1">
                        Node Options
                    </Typography>
                    <Grid container>
                        <Grid item sx={{ px: 1 }} xs={12}>
                            Type: {selectedNode.type}
                            <Tooltip title={selectedNode.id}>
                                <InfoOutlinedIcon fontSize="small" />
                            </Tooltip>
                        </Grid>
                        <Grid item sx={{ p: 1 }} xs={12}>
                            <NodeOptionDecision id={selectedNode.id} nodeType={nodeType} />
                        </Grid>
                    </Grid>
                    <IncomerOrderOption nodeId={selectedNode.id} />
                </Paper>
            )}
        </Panel>
    );
};

export default SettingPanel;
