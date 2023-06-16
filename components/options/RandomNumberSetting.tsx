import { NodeOption } from "@/types/generator";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { FC, SyntheticEvent, useCallback, useState } from "react";
import { RandomNumberOption } from "@/types/generator/nodeOption";

interface RandomNumberSettingProps {
    option: NodeOption<RandomNumberOption>;
    onChange: (change: NodeOption<RandomNumberOption>) => void;
}

const RandomNumberSetting: FC<RandomNumberSettingProps> = ({ option, onChange }) => {
    const { data } = option;

    const handleOnIsMemoryToggle = useCallback(
        (_: SyntheticEvent, checked: boolean) => {
            onChange({ ...option, data: { ...data, isMemory: checked } });
        },
        [option, data, onChange]
    );

    const handleOnNumberListChange = useCallback(
        (checkboxIndex: number) => (_: SyntheticEvent, checked: boolean) => {
            const allowNumber = data.allowNumber.map((value: boolean, index: number) => (checkboxIndex === index ? checked : value));
            if (allowNumber.every((checked) => !checked)) return; // not allow user to uncheck all the numbers
            onChange({ ...option, data: { ...data, allowNumber } });
        },
        [option, data, onChange]
    );

    return (
        <>
            <FormGroup row>
                <FormControlLabel checked={data.allowNumber[1]} control={<Checkbox />} label="1" onChange={handleOnNumberListChange(1)} />
                <FormControlLabel checked={data.allowNumber[2]} control={<Checkbox />} label="2" onChange={handleOnNumberListChange(2)} />
                <FormControlLabel checked={data.allowNumber[3]} control={<Checkbox />} label="3" onChange={handleOnNumberListChange(3)} />
                <FormControlLabel checked={data.allowNumber[4]} control={<Checkbox />} label="4" onChange={handleOnNumberListChange(4)} />
                <FormControlLabel checked={data.allowNumber[5]} control={<Checkbox />} label="5" onChange={handleOnNumberListChange(5)} />
                <FormControlLabel checked={data.allowNumber[6]} control={<Checkbox />} label="6" onChange={handleOnNumberListChange(6)} />
                <FormControlLabel checked={data.allowNumber[7]} control={<Checkbox />} label="7" onChange={handleOnNumberListChange(7)} />
                <FormControlLabel checked={data.allowNumber[8]} control={<Checkbox />} label="8" onChange={handleOnNumberListChange(8)} />
                <FormControlLabel checked={data.allowNumber[9]} control={<Checkbox />} label="9" onChange={handleOnNumberListChange(9)} />
                <FormControlLabel checked={data.allowNumber[0]} control={<Checkbox />} label="0" onChange={handleOnNumberListChange(0)} />
            </FormGroup>
            <FormGroup>
                <FormControlLabel checked={data.isMemory} control={<Checkbox />} label="Only once" onChange={handleOnIsMemoryToggle} />
            </FormGroup>
        </>
    );
};

export default RandomNumberSetting;
