import { FC, DragEventHandler } from "react";
import { Card, styled } from "@mui/material";
import { NodeType } from "@/types/generator";

const Root = styled(Card)(() => ({
    "&": {
        padding: "0.5rem",
    },
}));

const FixedValueWidget: FC = () => {
    const handleOnDragStart: DragEventHandler<HTMLDivElement> = (event) => {
        event.dataTransfer.setData("create_node", NodeType[NodeType.FIXED_VALUE]);
    };

    return (
        <Root draggable onDragStart={handleOnDragStart}>
            Fixed Value
        </Root>
    );
};

export default FixedValueWidget;
