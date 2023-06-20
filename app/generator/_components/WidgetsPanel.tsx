import { FC } from "react";
import { Panel } from "reactflow";
import FixedValueWidget from "@/components/widgets/FixedValueWidget";
import RandomNumberWidget from "@/components/widgets/RandomNumberWidget";
import CounterWidget from "@/components/widgets/CounterWidget";
import PaddingWidget from "@/components/widgets/PaddingWidget";
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
