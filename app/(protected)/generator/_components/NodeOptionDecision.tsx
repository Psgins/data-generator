import { FC, useMemo, useCallback, memo } from "react";
import { Node } from "reactflow";
import { Typography } from "@mui/material";
import { NodeType } from "../_types/nodeType";
import { NodeOption } from "../_types/nodeOption";
import useOption, { changeOption } from "../_hooks/useOptions";
import FixedValueSetting from "./node_setting/FixedValueSetting";
import RandomNumberSetting from "./node_setting/RandomNumberSetting";
import PaddingSetting from "./node_setting/PaddingSetting";

interface NodeOptionDecisionProps {
    id: string;
    nodeType: Node["type"];
}

const OptionNotFound: FC = () => {
    return (
        <Typography align="center" variant="body2">
            No option available
        </Typography>
    );
};

const NodeOptionDecision: FC<NodeOptionDecisionProps> = ({ id, nodeType }) => {
    const [options, optionDispatch] = useOption();

    const option = useMemo(() => options.find((option) => option.id === id), [options, id]);

    const handleOnChange = useCallback(
        (change: NodeOption<any>) => {
            if (!option) return;
            optionDispatch(changeOption(change));
        },
        [option]
    );

    if (!option) return <OptionNotFound />;

    switch (nodeType) {
        case NodeType.FIXED_VALUE:
            return <FixedValueSetting option={option} onChange={handleOnChange} />;
        case NodeType.RANDOM_NUMBER:
            return <RandomNumberSetting option={option} onChange={handleOnChange} />;
        case NodeType.PADDING:
            return <PaddingSetting option={option} onChange={handleOnChange} />;
        default:
            return <OptionNotFound />;
    }
};

export default memo(NodeOptionDecision);
