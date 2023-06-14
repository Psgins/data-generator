import { DragEventHandler, FC, MouseEventHandler, DragEvent, useRef, RefObject, useCallback } from "react";
import { Box, Grid, styled } from "@mui/material";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

interface DragableBoxProps {
    dragging?: boolean;
}

const DragableBox = styled(Box, { shouldForwardProp: (prop) => prop !== "dragging" })<DragableBoxProps>(({ dragging }) => ({
    "&": {
        display: "flex",
        cursor: "grab",
    },
    "& > *": {
        opacity: 1,
        ...(dragging && {
            opacity: 0.2,
        }),
    },
}));

interface IncomerOrderItemProps {
    dragging?: boolean;
    dragFocus?: boolean;
    id: string;
    onDragStart: (id: string) => void;
    onDragOver: (id: string) => void;
    onDragEnd: () => void;
}

const IncomerOrderItem: FC<IncomerOrderItemProps> = ({ id, dragging, onDragStart, onDragOver, onDragEnd }) => {
    const handleOnDragStart: DragEventHandler = useCallback(
        (event: DragEvent<HTMLDivElement>) => {
            event.dataTransfer.effectAllowed = "move";
            onDragStart(id);
        },
        [onDragStart]
    );

    const handleOnDragOver = useCallback(
        (event: DragEvent<HTMLDivElement>) => {
            event.preventDefault();
            onDragOver(id);
        },
        [onDragOver]
    );

    const handleOnDragEnd = useCallback(() => {
        onDragEnd();
    }, [onDragEnd]);

    return (
        <Grid item xs={12}>
            <DragableBox
                draggable
                sx={{ display: "flex", opacity: dragging ? 0.2 : 1, cursor: "grab" }}
                onDragStart={handleOnDragStart}
                onDragOver={handleOnDragOver}
                onDragEnd={handleOnDragEnd}
            >
                <Box>
                    <DragIndicatorIcon />
                </Box>
                <Box sx={{ flexGrow: 1, textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" }}>{id}</Box>
            </DragableBox>
        </Grid>
    );
};

export default IncomerOrderItem;
