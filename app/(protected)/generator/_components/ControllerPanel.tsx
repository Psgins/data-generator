import { FC, useCallback, useState } from "react";
import { useEdges, useNodes } from "reactflow";
import { useSnackbar } from "notistack";
import { Box, Button } from "@mui/material";
import { ResponseModel } from "@/types/api";
import { useAxiosAuth } from "@/util/axios";
import useOption from "../_hooks/useOptions";
import useIncomerOrder from "../_hooks/useIncomerOrder";
import useInfo from "../_hooks/useInfo";
import { generate, preview } from "../_utils/generator";
import { updateFlowStore, useFlowStore } from "../_hooks/useFlowStore";
import ContentPasteSearchOutlinedIcon from "@mui/icons-material/ContentPasteSearchOutlined";
import SaveAltOutlinedIcon from "@mui/icons-material/SaveAltOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import PreviewModal from "./PreviewModal";

const ControllerPanel: FC = () => {
    const axios = useAxiosAuth();
    const { enqueueSnackbar } = useSnackbar();

    const nodes = useNodes();
    const edges = useEdges();
    const [flowStore, flowStoreDispatch] = useFlowStore();
    const [options] = useOption();
    const [orders] = useIncomerOrder();
    const [info] = useInfo();

    const [previewData, setPreviewData] = useState<string[]>([]);

    const handleOnPreview = useCallback(() => {
        const data = preview(info, nodes, edges, options, orders);
        setPreviewData(data);
    }, [info, nodes, edges, options, orders, setPreviewData]);

    const handleOnGenerate = useCallback(() => {
        generate(info, nodes, edges, options, orders);
    }, [info, nodes, edges, options, orders]);

    const handleOnSave = useCallback(async () => {
        try {
            const body = { info, nodes, edges, options, orders };
            if (!flowStore.id) {
                const { data: responseData } = await axios.post<ResponseModel<number>>("/v1/template", body);
                const { status, data } = responseData;
                flowStoreDispatch(updateFlowStore({ id: data }));
                enqueueSnackbar("Template has been saved", { variant: "success", autoHideDuration: 1500 });
            } else {
                await axios.patch(`/v1/template/${flowStore.id}`, body);
                enqueueSnackbar("Template has been updated", { variant: "success", autoHideDuration: 1500 });
            }
        } catch (error) {
            console.error(error);
            enqueueSnackbar("Cannot save template", { variant: "error", autoHideDuration: 5000 });
        }
    }, [axios, flowStore, info, nodes, edges, options, orders, enqueueSnackbar, flowStoreDispatch]);

    const handleOnPreviewClose = useCallback(() => setPreviewData([]), []);

    return (
        <>
            <Box sx={{ width: 300, pb: 2, display: "flex" }}>
                <Box sx={{ display: "flex", flexGrow: 1 }}>
                    <Button variant="contained" color="secondary" startIcon={<ContentPasteSearchOutlinedIcon />} onClick={handleOnPreview}>
                        preview
                    </Button>
                </Box>
                <Box sx={{ display: "flex" }}>
                    <Button variant="contained" color="primary" sx={{ ml: 1, pl: 1, pr: 1, minWidth: 4 }} onClick={handleOnGenerate}>
                        <SaveAltOutlinedIcon />
                    </Button>
                    <Button variant="contained" color="primary" sx={{ ml: 1, pl: 1, pr: 1, minWidth: 4 }} onClick={handleOnSave}>
                        <SaveOutlinedIcon />
                    </Button>
                </Box>
            </Box>
            <PreviewModal dataset={previewData} onClose={handleOnPreviewClose} />
        </>
    );
};

export default ControllerPanel;
