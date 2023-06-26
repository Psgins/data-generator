import { ChangeEvent, FC, useCallback } from "react";
import { TextField } from "@mui/material";
import { NodeOption, FixedInputOption } from "../../_types/nodeOption";

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

    return <TextField fullWidth label="value" size="small" variant="outlined" value={option.data} onChange={handleOnChange} />;
};

export default FixedInputOption;
