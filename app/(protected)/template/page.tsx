"use client";

import { FC, useCallback, useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { Container, Grid } from "@mui/material";
import { useAxiosAuth } from "@/util/axios";
import { ResponseModel } from "@/types/api";
import TemplateSkeleton from "./_components/TemplateSkeleton";
import TemplateCard from "./_components/TemplateCard";
import { Template, TemplateResponseData } from "./types";

const TemplatePage: FC = () => {
    const axios = useAxiosAuth();
    const { enqueueSnackbar } = useSnackbar();

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
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }, [axios, setIsLoading, setTemplates]);

    const deleteTemplate = useCallback(
        async (id: number) => {
            try {
                const { data: responseData } = await axios.delete(`/v1/template/${id}`);
                enqueueSnackbar("Template has been deleted", { variant: "success", autoHideDuration: 1500 });
                loadTemplate();
            } catch (error) {
                console.log(error);
                enqueueSnackbar("Cannot delete template", { variant: "error", autoHideDuration: 5000 });
            }
        },
        [axios, enqueueSnackbar, loadTemplate]
    );

    const handleOnTemplateDelete = useCallback(
        (id: number) => () => {
            deleteTemplate(id);
        },
        [deleteTemplate]
    );

    return isLoading ? (
        <TemplateSkeleton />
    ) : (
        <Container sx={{ py: 4 }}>
            <Grid container spacing={2}>
                {templates.map((template) => (
                    <Grid key={template.id} item xs={3}>
                        <TemplateCard template={template} onDelete={handleOnTemplateDelete(template.id)} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default TemplatePage;
