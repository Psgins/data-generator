import { ChangeEvent, FC } from "react";
import { Box, Paper, Typography, IconButton, TextField, Grid } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import useGeneratorInfo, { infoUpdate } from "../_hooks/useInfo";

const GeneratorSettingPanel: FC = () => {
    const [info, infoDispatch] = useGeneratorInfo();

    const handleOnStringChange = (name: string, lengthLimit: number) => (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        if (value.length <= lengthLimit) {
            infoDispatch(infoUpdate({ [name]: value }));
        }
    };

    const handleOnNumberChange = (name: string, lengthLimit: number) => (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        if (value.length <= lengthLimit && /^\d*$/.test(value)) {
            infoDispatch(infoUpdate({ [name]: value }));
        }
    };

    return (
        <Paper sx={{ width: 300 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography textAlign="center" sx={{ flexGrow: 1 }}>
                    Generator Setting
                </Typography>
                <IconButton size="small">
                    <RemoveIcon />
                </IconButton>
            </Box>
            <Grid container spacing={1} sx={{ p: 1 }}>
                <Grid item xs={12}>
                    <TextField fullWidth label="Name" size="small" value={info.name} variant="outlined" onChange={handleOnStringChange("name", 50)} />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Iteration"
                        value={info.iteration}
                        size="small"
                        variant="outlined"
                        onChange={handleOnNumberChange("iteration", 9)}
                    />
                </Grid>
            </Grid>
        </Paper>
    );
};

export default GeneratorSettingPanel;
