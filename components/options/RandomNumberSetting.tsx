import { NodeOption } from "@/types/generator";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { FC, SyntheticEvent } from "react";
import { RandomNumberOption } from "@/types/generator/nodeOption";

interface RandomNumberSettingProps {
    option: NodeOption<RandomNumberOption>;
    onChange: (change: NodeOption<RandomNumberOption>) => void;
}

const RandomNumberSetting: FC<RandomNumberSettingProps> = ({ option, onChange }) => {
    const handleOnIsMemoryToggle = (_: SyntheticEvent, checked: boolean) => {
        const { data } = option;
        onChange({ ...option, data: { ...data, isMemory: checked } });
    };

    return (
        <FormGroup>
            <FormControlLabel checked={option.data.isMemory} control={<Checkbox />} label="is memory" onChange={handleOnIsMemoryToggle} />
        </FormGroup>
    );
};

export default RandomNumberSetting;
