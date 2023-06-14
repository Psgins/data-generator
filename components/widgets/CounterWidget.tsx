import { DragEventHandler, FC } from "react";
import { Card, styled } from "@mui/material";
import { NodeType } from "@/types/generator";

const Root = styled(Card)(() => ({
    "&": {
        padding: "0.5rem",
    },
}));

const CounterWidget: FC = () => {
    const handleOnDragStart: DragEventHandler<HTMLDivElement> = (event) => {
        event.dataTransfer.setData("create_node", NodeType[NodeType.COUNTER]);
    };

    return (
        <Root draggable onDragStart={handleOnDragStart}>
            Counter
        </Root>
    );
};

export default CounterWidget;
