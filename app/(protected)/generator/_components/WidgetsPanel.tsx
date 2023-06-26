import { FC } from "react";
import { Panel } from "reactflow";
import FixedValueWidget from "./node_widget/FixedValueWidget";
import RandomNumberWidget from "./node_widget/RandomNumberWidget";
import CounterWidget from "./node_widget/CounterWidget";
import PaddingWidget from "./node_widget/PaddingWidget";
import { Box, Divider, Paper } from "@mui/material";

const WidgetsPanel: FC = () => {
    return (
        <Panel position="top-left">
            <Paper sx={{ width: 80 }}>
                <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                    <FixedValueWidget />
                    <RandomNumberWidget />
                    <CounterWidget />
                </Box>
                <Divider />
                <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                    <PaddingWidget />
                </Box>
            </Paper>
        </Panel>
    );
};

export default WidgetsPanel;
