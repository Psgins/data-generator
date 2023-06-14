import { ChangeEvent, FC, useCallback } from "react";
import { TextField } from "@mui/material";
import { NodeOption } from "@/types/generator";
import { FixedInputOption } from "@/types/generator/nodeOption";

interface FixedInputOptionProps {
    option: NodeOption<FixedInputOption>;
    onChange: (change: NodeOption<FixedInputOption>) => void;
}

const FixedInputOption: FC<FixedInputOptionProps> = ({ option, onChange }) => {
    const handleOnChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            onChange({ ...option, data: e.target.value });
        },
        [onChange]
    );

    return <TextField fullWidth label="Fixed Value" size="small" variant="outlined" value={option.data} onChange={handleOnChange} />;
};

export default FixedInputOption;
