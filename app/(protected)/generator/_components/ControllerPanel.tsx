import { FC, useCallback } from "react";
import { useEdges, useNodes } from "reactflow";
import { Box, Button } from "@mui/material";
import { ResponseModel } from "@/types/api";
import { useAxiosAuth } from "@/util/axios";
import useOption from "../_hooks/useOptions";
import useIncomerOrder from "../_hooks/useIncomerOrder";
import useInfo from "../_hooks/useInfo";
import { generate } from "../_utils/generator";
import { updateFlowStore, useFlowStore } from "../_hooks/useFlowStore";

const ControllerPanel: FC = () => {
    const axios = useAxiosAuth();

    const nodes = useNodes();
    const edges = useEdges();
    const [flowStore, flowStoreDispatch] = useFlowStore();
    const [options] = useOption();
    const [orders] = useIncomerOrder();
    const [info] = useInfo();

    const handleOnPreview = useCallback(() => {
        generate(info, nodes, edges, options, orders);
    }, [info, nodes, edges, options, orders]);

    const handleOnSave = useCallback(async () => {
        try {
            const body = { info, nodes, edges, options, orders };
            if (!flowStore.id) {
                const { data: responseData } = await axios.post<ResponseModel<number>>("/v1/template", body);
                const { status, data } = responseData;
                flowStoreDispatch(updateFlowStore({ id: data }));
                console.log("save new template", data);
            } else {
                const { data: responseData } = await axios.patch(`/v1/template/${flowStore.id}`, body);
                const { status } = responseData;
                console.log("update template");
            }
        } catch (error) {
            console.error(error);
        }
    }, [axios, flowStore, info, nodes, edges, options, orders, flowStoreDispatch]);

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
