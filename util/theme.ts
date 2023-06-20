import { createTheme } from "@mui/material";

const colors: Record<string, string> = {
    Onyx: "#35363A",
};

const theme = createTheme({
    palette: {
        mode: "dark",
        background: {
            default: colors.Onyx,
        },
    },
});

export default theme;
