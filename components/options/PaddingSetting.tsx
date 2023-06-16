import { NodeOption } from "@/types/generator";
import { PaddingOption } from "@/types/generator/nodeOption";
import { Grid, TextField } from "@mui/material";
import { ChangeEvent, FC, useCallback } from "react";

interface PaddingSettingProps {
    option: NodeOption<PaddingOption>;
    onChange: (change: NodeOption<PaddingOption>) => void;
}

const PaddingSetting: FC<PaddingSettingProps> = ({ option, onChange }) => {
    const changeOption = useCallback(
        (change: Partial<PaddingOption>) => {
            onChange({ ...option, data: { ...option.data, ...change } });
        },
        [option, onChange]
    );

    const handleOnPadCharChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            const { value } = event.target;
            if (value.length <= 1) {
                changeOption({ padChar: value });
            }
        },
        [changeOption]
    );

    const handleOnLengthChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            const { value } = event.target;
            if (value.length <= 3 && /^\d*$/.test(value)) {
                changeOption({ length: value });
            }
        },
        [changeOption]
    );

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <TextField fullWidth label="with" size="small" variant="outlined" value={option.data.padChar} onChange={handleOnPadCharChange} />
            </Grid>
            <Grid item xs={12}>
                <TextField fullWidth label="length" size="small" variant="outlined" value={option.data.length} onChange={handleOnLengthChange} />
            </Grid>
        </Grid>
    );
};

export default PaddingSetting;
