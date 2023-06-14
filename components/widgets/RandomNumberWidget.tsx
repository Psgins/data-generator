import { DragEventHandler, FC } from "react";
import { Card, styled } from "@mui/material";
import { NodeType } from "@/types/generator";

const Root = styled(Card)(() => ({
    "&": {
        padding: "0.5rem",
    },
}));

const RandomNumberWidget: FC = () => {
    const handleOnDragStart: DragEventHandler<HTMLDivElement> = (event) => {
        event.dataTransfer.setData("create_node", NodeType[NodeType.RANDOM_NUMBER]);
    };

    return (
        <Root draggable onDragStart={handleOnDragStart}>
            Random Number
        </Root>
    );
};

export default RandomNumberWidget;
