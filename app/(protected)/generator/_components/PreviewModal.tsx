import { FC, useCallback, useMemo, MouseEvent } from "react";
import { Box, Grid, IconButton, Modal, Paper, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface PreviewModalProps {
    dataset: string[];
    onClose: (event: any, reason: string) => void;
}

const PreviewModal: FC<PreviewModalProps> = ({ dataset, onClose }) => {
    const data = useMemo(() => {
        if (dataset.length > 5) {
            return dataset.slice(0, 5);
        }
        if (dataset.length < 5) {
            return [...dataset, ...Array(5 - dataset.length).fill(" ")];
        }
        return dataset;
    }, [dataset]);

    const handleOnClickClose = useCallback(
        (e: MouseEvent) => {
            onClose(e, "clickclose");
        },
        [onClose]
    );

    return (
        <Modal open={dataset.length > 0} slotProps={{ backdrop: { sx: { backgroundColor: "rgba(0,0,0,0.87)" } } }} onClose={onClose}>
            <Paper sx={{ width: 500, p: 3, left: "calc(50% - 250px)", top: "calc(30% - 120px)", position: "absolute" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant="h5" sx={{ display: "flex", flexGlow: 1 }}>
                        Preview
                    </Typography>
                    <IconButton onClick={handleOnClickClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Paper elevation={0} sx={{ mt: 2 }}>
                    <Grid container>
                        <Grid item xs={1} sx={{ borderRightColor: "#fff", borderRightStyle: "inset" }}>
                            <Grid item xs={12}>
                                <Typography textAlign="center" variant="body1">
                                    1
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography textAlign="center" variant="body1">
                                    2
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography textAlign="center" variant="body1">
                                    3
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography textAlign="center" variant="body1">
                                    4
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography textAlign="center" variant="body1">
                                    5
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                &nbsp;
                            </Grid>
                        </Grid>
                        <Grid item xs={11} sx={{ overflowX: "scroll" }}>
                            {data.map((d, index) => (
                                <Grid key={index} item xs={12}>
                                    <Typography variant="body1" sx={{ mx: 1 }}>
                                        {d}
                                    </Typography>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Paper>
            </Paper>
        </Modal>
    );
};

export default PreviewModal;
