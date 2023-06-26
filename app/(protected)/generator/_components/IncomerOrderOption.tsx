import { FC, useMemo, useState, useCallback } from "react";
import { Chip, Divider, Grid, styled } from "@mui/material";
import useIncomerOrder, { changeOrder } from "../_hooks/useIncomerOrder";
import IncomerOrderItem from "./IncomerOrderItem";

interface IncomerOrderOptionProps {
    nodeId: string;
}

const IncomerOrderOption: FC<IncomerOrderOptionProps> = ({ nodeId }) => {
    const [orders, orderDispatch] = useIncomerOrder();
    const [dragging, setDragging] = useState<string>();

    const incomers = useMemo(() => {
        return orders[nodeId] || [];
    }, [orders, nodeId]);

    const handleOnDragStart = useCallback(
        (id: string) => {
            setDragging(id);
        },
        [setDragging]
    );

    const handleOnDragOver = useCallback(
        (id: string) => {
            if (typeof dragging === "undefined" || id === dragging) return;

            const draggingIndex = incomers.findIndex((incomer) => incomer === dragging);
            const targetIndex = incomers.findIndex((incomer) => incomer === id);

            const newList = incomers.map((incomer, index) => {
                if (index === draggingIndex) return id;
                if (index === targetIndex) return dragging;
                return incomer;
            });

            orderDispatch(changeOrder(nodeId, newList));
        },
        [dragging, incomers, orderDispatch]
    );

    const handleOnDragEnd = useCallback(() => {
        setDragging(undefined);
    }, [setDragging]);

    return incomers.length > 0 ? (
        <>
            <Divider variant="middle">
                <Chip size="small" label="ORDER" />
            </Divider>
            <Grid container sx={{ pl: 0.25, pr: 0.5, py: 0.5 }}>
                {incomers.map((incomer) => (
                    <IncomerOrderItem
                        key={incomer}
                        dragging={dragging === incomer}
                        id={incomer}
                        onDragStart={handleOnDragStart}
                        onDragOver={handleOnDragOver}
                        onDragEnd={handleOnDragEnd}
                    />
                ))}
            </Grid>
        </>
    ) : null;
};

export default IncomerOrderOption;
