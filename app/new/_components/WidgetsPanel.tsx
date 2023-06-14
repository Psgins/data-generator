import { FC } from "react";
import { Panel } from "reactflow";
import FixedValueWidget from "@/components/widgets/FixedValueWidget";
import RandomNumberWidget from "@/components/widgets/RandomNumberWidget";
import CounterWidget from "@/components/widgets/CounterWidget";
import PaddingWidget from "@/components/widgets/PaddingWidget";

const WidgetsPanel: FC = () => {
    return (
        <Panel position="top-left">
            <FixedValueWidget />
            <RandomNumberWidget />
            <CounterWidget />
            <PaddingWidget />
        </Panel>
    );
};

export default WidgetsPanel;
