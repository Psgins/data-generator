import { FC, useCallback } from "react";
import { useEdges, useNodes } from "reactflow";
import { Box, Button } from "@mui/material";
import { generate } from "@/util/generator";
import useOption from "../_hooks/useOptions";
import useIncomerOrder from "../_hooks/useIncomerOrder";
import useInfo from "../_hooks/useInfo";

const ControllerPanel: FC = () => {
    const nodes = useNodes();
    const edges = useEdges();
    const [options] = useOption();
    const [orders] = useIncomerOrder();
    const [info] = useInfo();

    const handleOnPreview = useCallback(() => {
        generate(info, nodes, edges, options, orders);
    }, [info, nodes, edges, options, orders]);

    const handleOnSave = useCallback(() => {
        console.log("info", info);
        console.log("nodes", nodes);
        console.log("edges", edges);
        console.log("options", options);
        console.log("orders", orders);
    }, [info, nodes, edges, options, orders]);

    return (
        <Box sx={{ width: 300, pb: 2, display: "flex", justifyContent: "space-between" }}>
            <Button variant="contained" color="secondary" onClick={handleOnPreview}>
                Preview
            </Button>
            <Button variant="contained" color="primary">
                Generate
            </Button>
            <Button variant="contained" color="info" onClick={handleOnSave}>
                Save
            </Button>
        </Box>
    );
};

export default ControllerPanel;
