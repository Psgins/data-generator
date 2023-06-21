import { FC } from "react";
import { Node } from "reactflow";
import { Paper, Typography, Grid, Tooltip, Box, IconButton } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import NodeOptionDecision from "./NodeOptionDecision";
import IncomerOrderOption from "./IncomerOrderOption";
import { NodeData } from "@/types/generator/nodeData";
import CloseIcon from "@mui/icons-material/Close";
import { getNodeNameByNodeType } from "@/util/generator/node";

interface NodeSettingPanelProps {
    node: Node<NodeData>;
    onClose: () => void;
}

const NodeSettingPanel: FC<NodeSettingPanelProps> = ({ node, onClose }) => {
    return (
        <Paper sx={{ width: 300 }}>
            <Box sx={{ display: "flex", alignItems: "center", pl: 1 }}>
                <Typography sx={{ flexGrow: 1 }}>{`${getNodeNameByNodeType(node.type)}`}</Typography>
                <Tooltip title={node.id}>
                    <InfoOutlinedIcon fontSize="small" />
                </Tooltip>
                <IconButton size="small" onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </Box>
            <Grid container>
                <Grid item sx={{ p: 1 }} xs={12}>
                    <NodeOptionDecision id={node.id} nodeType={node.type} />
                </Grid>
            </Grid>
            <IncomerOrderOption nodeId={node.id} />
        </Paper>
    );
};

export default NodeSettingPanel;
