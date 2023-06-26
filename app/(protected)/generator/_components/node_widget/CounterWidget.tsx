import { DragEventHandler, FC } from "react";
import { Box, Tooltip, styled } from "@mui/material";
import PlusOneOutlinedIcon from "@mui/icons-material/PlusOneOutlined";
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

const CounterWidget: FC = () => {
    const handleOnDragStart: DragEventHandler<HTMLDivElement> = (event) => {
        event.dataTransfer.setData("create_node", NodeType[NodeType.COUNTER]);
    };

    return (
        <Tooltip placement="top" title="Counter">
            <Root draggable onDragStart={handleOnDragStart}>
                <PlusOneOutlinedIcon />
            </Root>
        </Tooltip>
    );
};

export default CounterWidget;
