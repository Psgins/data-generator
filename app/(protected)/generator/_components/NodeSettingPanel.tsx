import { FC } from "react";
import { Node } from "reactflow";
import { Paper, Typography, Grid, Tooltip, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import NodeOptionDecision from "./NodeOptionDecision";
import IncomerOrderOption from "./IncomerOrderOption";
import { getNodeNameByNodeType } from "../_utils/node";

interface NodeSettingPanelProps {
    node: Node;
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
