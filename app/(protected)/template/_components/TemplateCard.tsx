import { FC, useCallback } from "react";
import { Button, Card, CardActionArea, CardActions, CardContent, CardHeader, Typography } from "@mui/material";
import { Template } from "../types";
import { useRouter } from "next/navigation";
import { format } from "@/util/datetime";

interface TemplateCardProps {
    template: Template;
}

const TemplateCard: FC<TemplateCardProps> = ({ template }) => {
    const router = useRouter();

    const handleOnClick = useCallback(() => {
        router.push(`/generator/${template.id}`);
    }, [router]);

    return (
        <Card>
            <CardActionArea onClick={handleOnClick}>
                <CardHeader title={template.info.name} />
                <CardContent>
                    <Typography>Last update: {format(template.createdAt)}</Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    Delete
                </Button>
            </CardActions>
        </Card>
    );
};

export default TemplateCard;
