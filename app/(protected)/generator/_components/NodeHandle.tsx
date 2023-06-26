import { Handle } from "reactflow";
import { styled } from "@mui/material/styles";

const NodeHandle = styled(Handle)(() => ({
    "&": {
        width: "12px",
        height: "12px",
        borderRadius: "4px",
    },
    "&.react-flow__handle.source": {
        right: "-6px",
    },
    "&.react-flow__handle.target": {
        left: "-6px",
    },
}));

export default NodeHandle;
