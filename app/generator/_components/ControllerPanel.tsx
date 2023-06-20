import { FC, useCallback } from "react";
import { useEdges, useNodes } from "reactflow";
import { Box, Button } from "@mui/material";
import { generate } from "@/util/generator";
import useOption from "../_hooks/useOptions";
import useIncomerOrder from "../_hooks/useIncomerOrder";
import useInfo from "../_hooks/useInfo";
import { useAxiosAuth } from "@/util/axios";

const ControllerPanel: FC = () => {
    const axios = useAxiosAuth();

    const nodes = useNodes();
    const edges = useEdges();
    const [options] = useOption();
    const [orders] = useIncomerOrder();
    const [info] = useInfo();

    const handleOnPreview = useCallback(() => {
        generate(info, nodes, edges, options, orders);
    }, [info, nodes, edges, options, orders]);

    const handleOnSave = useCallback(async () => {
        try {
            const { data: responseData } = await axios.post("/v1/template", {
                info,
                nodes,
                edges,
                options,
                orders,
            });
            const { status } = responseData;
            console.log(status);
        } catch (error) {
            console.error(error);
        }
    }, [axios, info, nodes, edges, options, orders]);

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
