"use client";

import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useAxiosAuth } from "@/util/axios";
import Workspace from "../_components/Workspace";
import { Edge, Node } from "reactflow";
import useInfo, { initInfo } from "../_hooks/useInfo";
import useOption, { initOption } from "../_hooks/useOptions";
import useIncomerOrder, { initOrder } from "../_hooks/useIncomerOrder";
import { initFlowStore, useFlowStore } from "../_hooks/useFlowStore";
import useSession from "@/hooks/useSession";

interface GeneratorParams {
    id: string;
}

interface GeneratorTemplatePageProps {
    params: GeneratorParams;
}

const GeneratorTemplatePage: FC<GeneratorTemplatePageProps> = ({ params }) => {
    const { id } = params;
    const axios = useAxiosAuth();

    const [_flowStore, flowStoreDispatch] = useFlowStore();
    const [_info, infoDispatch] = useInfo();
    const [_option, optionDispatch] = useOption();
    const [_order, orderDispatch] = useIncomerOrder();

    const [isLoading, setIsLoading] = useState(true);
    const [nodes, setNodes] = useState<Node[]>([]);
    const [edges, setEdges] = useState<Edge[]>([]);

    useEffect(() => {
        init();
    }, []);

    const init = useCallback(async () => {
        try {
            const { status, data: responseData } = await axios.get(`/v1/template/${id}`);
            const { data } = responseData;
            const { info, nodes, edges, options, orders } = data;

            flowStoreDispatch(initFlowStore({ id: parseInt(id, 10) }));
            infoDispatch(initInfo(JSON.parse(info)));
            optionDispatch(initOption(JSON.parse(options)));
            orderDispatch(initOrder(JSON.parse(orders)));
            setNodes(JSON.parse(nodes));
            setEdges(JSON.parse(edges));
        } catch (error) {
            // TODO: handle error
            console.error("error", error);
        } finally {
            setIsLoading(false);
        }
    }, [axios, flowStoreDispatch, setNodes, setEdges, infoDispatch, optionDispatch, orderDispatch, setNodes, setEdges]);

    return isLoading ? <>loading...</> : <Workspace initialEdges={edges} initialNodes={nodes} />;
};

export default GeneratorTemplatePage;
