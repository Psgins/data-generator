import { FC, DragEventHandler } from "react";
import { Box, Card, Tooltip, styled } from "@mui/material";
import { NodeType } from "@/types/generator";
import AlignHorizontalLeftIcon from "@mui/icons-material/AlignHorizontalLeft";

const Root = styled(Box)(() => ({
    "&": {
        width: "40px",
        height: "40px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "grab",
    },
    "&:hover": {
        backgroundColor: "rgb(66, 66, 66)",
    },
}));

const PaddingWidget: FC = () => {
    const handleOnDragStart: DragEventHandler<HTMLDivElement> = (event) => {
        event.dataTransfer.setData("create_node", NodeType[NodeType.PADDING]);
    };

    return (
        <Tooltip placement="top" title="Padding">
            <Root draggable onDragStart={handleOnDragStart}>
                <AlignHorizontalLeftIcon />
            </Root>
        </Tooltip>
    );
};

export default PaddingWidget;
