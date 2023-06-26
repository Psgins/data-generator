import { FC, PropsWithChildren } from "react";
import { Box, Paper, Typography, styled } from "@mui/material";

const NodeContainer = styled(Paper)(() => ({
    "&": {
        backgroundColor: "#424242",
        width: "150px",
    },
}));

const NodeHeader = styled(Typography)(() => ({
    "&": {
        backgroundColor: "#121212",
        borderTopLeftRadius: "4px",
        borderTopRightRadius: "4px",
    },
}));

const NodeContent = styled(Box)(() => ({
    "&": {
        position: "relative",
        height: "2rem",
    },
}));

interface NodeCardProps {
    title: string;
}

const NodeCard: FC<PropsWithChildren<NodeCardProps>> = (props) => {
    const { title, children } = props;
    return (
        <NodeContainer>
            <NodeHeader textAlign="center" variant="body1">
                {title}
            </NodeHeader>
            <NodeContent>{children}</NodeContent>
        </NodeContainer>
    );
};

export default NodeCard;
