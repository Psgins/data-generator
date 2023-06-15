import { FC, useMemo, useCallback } from "react";
import { Node } from "reactflow";
import FixedValueSetting from "@/components/options/FixedValueSetting";
import RandomNumberSetting from "@/components/options/RandomNumberSetting";
import { NodeOption, NodeType } from "@/types/generator";
import useOption, { changeOption } from "../_hooks/useOptions";
import PaddingSetting from "@/components/options/PaddingSetting";

interface NodeOptionDecisionProps {
    id: string;
    nodeType: Node["type"];
}

const OptionNotFound: FC = () => {
    return <>No Option Available</>;
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

export default NodeOptionDecision;
