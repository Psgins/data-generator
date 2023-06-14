import { FC, useCallback } from "react";
import { Panel, useEdges, useNodes } from "reactflow";
import { Button } from "@mui/material";
import useOption from "../_hooks/useOptions";
import useIncomerOrder from "../_hooks/useIncomerOrder";
import { generate } from "@/util/generator";

const ControllerPanel: FC = () => {
    const nodes = useNodes();
    const edges = useEdges();
    const [options] = useOption();
    const [orders] = useIncomerOrder();

    const handleOnGenerate = useCallback(() => {
        generate(nodes, edges, options, orders);
    }, [nodes, edges, options, orders]);

    return (
        <Panel position="top-center">
            <Button variant="contained" color="primary" onClick={handleOnGenerate}>
                Generate
            </Button>
        </Panel>
    );
};

export default ControllerPanel;
