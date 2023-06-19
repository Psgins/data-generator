import { FC, DragEventHandler } from "react";
import { Box, Tooltip, styled } from "@mui/material";
import { NodeType } from "@/types/generator";
import FontDownloadIcon from "@mui/icons-material/FontDownload";

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

const FixedValueWidget: FC = () => {
    const handleOnDragStart: DragEventHandler<HTMLDivElement> = (event) => {
        event.dataTransfer.setData("create_node", NodeType[NodeType.FIXED_VALUE]);
    };
    return (
        <Tooltip placement="top" title="Fixed Value">
            <Root draggable onDragStart={handleOnDragStart}>
                <FontDownloadIcon />
            </Root>
        </Tooltip>
    );
};

export default FixedValueWidget;
