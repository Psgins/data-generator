import { styled } from "@mui/material/styles";
import SyncIcon from "@mui/icons-material/Sync";

const LoadingSpinnerIcon = styled(SyncIcon)(() => ({
    "@keyframes LoadingSpinner": {
        "0%": {
            transform: "rotate(0deg)",
        },
        "100%": {
            transform: "rotate(-179deg)",
        },
    },
    "&": {
        animation: "LoadingSpinner 2s linear infinite",
    },
}));

export default LoadingSpinnerIcon;
