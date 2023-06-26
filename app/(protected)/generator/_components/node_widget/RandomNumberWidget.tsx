import { DragEventHandler, FC } from "react";
import { Box, Tooltip, styled } from "@mui/material";
import Filter1OutlinedIcon from "@mui/icons-material/Filter1Outlined";
import { NodeType } from "../../_types/nodeType";

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

const RandomNumberWidget: FC = () => {
    const handleOnDragStart: DragEventHandler<HTMLDivElement> = (event) => {
        event.dataTransfer.setData("create_node", NodeType[NodeType.RANDOM_NUMBER]);
    };

    return (
        <Tooltip placement="top" title="Random Number">
            <Root draggable onDragStart={handleOnDragStart}>
                <Filter1OutlinedIcon />
            </Root>
        </Tooltip>
    );
};

export default RandomNumberWidget;
