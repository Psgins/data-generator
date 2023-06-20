"use client";

import { FC, useCallback, useEffect, useState } from "react";
import { Container, Grid, styled } from "@mui/material";
import { useAxiosAuth } from "@/util/axios";
import TemplateSkeleton from "./_components/TemplateSkeleton";
import TemplateCard from "./_components/TemplateCard";
import { Template, TemplateResponseData } from "./types";

interface ResponseStatus {
    code: string;
    message: string;
}

interface ResponseModel<T> {
    status: ResponseStatus;
    data: T;
}

const Root = styled(Container)(({ theme }) => ({
    "&": {
        minHeight: "calc(100vh - 68.5px)",
        backgroundColor: theme.palette.background.default,
    },
}));

const TemplatePage: FC = () => {
    const axios = useAxiosAuth();

    const [isLoading, setIsLoading] = useState(true);
    const [templates, setTemplates] = useState<Template[]>([]);

    useEffect(() => {
        loadTemplate();
    }, []);

    const loadTemplate = useCallback(async () => {
        try {
            const { data: responseData } = await axios.get<ResponseModel<TemplateResponseData[]>>("/v1/template");
            console.log(responseData);
            const { status, data } = responseData;
            if (status.code === "SUCCESS") {
                setTemplates(data.map((template) => ({ ...template, info: JSON.parse(template.info) })));
            }
        } catch (error) {
            console.error("error", error);
        } finally {
            setIsLoading(false);
        }
    }, [axios, setIsLoading, setTemplates]);

    // return <TemplateSkeleton />;
    return isLoading ? (
        <TemplateSkeleton />
    ) : (
        <Root maxWidth={false}>
            <Container>
                <Grid container>
                    {templates.map((template) => (
                        <Grid key={template.id} item xs={3}>
                            <TemplateCard template={template} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Root>
    );
};

export default TemplatePage;
