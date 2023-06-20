"use client";

import { FC, useCallback, useEffect, useState } from "react";
import { useAxiosAuth } from "@/util/axios";
import { useSession } from "next-auth/react";
import Workspace from "../_components/Workspace";
import { Edge, Node } from "reactflow";
import useInfo, { initInfo } from "../_hooks/useInfo";
import useOption, { initOption } from "../_hooks/useOptions";
import useIncomerOrder, { initOrder } from "../_hooks/useIncomerOrder";

interface GeneratorParams {
    id: string;
}

interface GeneratorTemplatePageProps {
    params: GeneratorParams;
}

const GeneratorTemplatePage: FC<GeneratorTemplatePageProps> = ({ params }) => {
    const { id } = params;
    const { data: session } = useSession();
    const axios = useAxiosAuth();
    const [_info, infoDispatch] = useInfo();
    const [_option, optionDispatch] = useOption();
    const [_order, orderDispatch] = useIncomerOrder();

    const [isLoading, setIsLoading] = useState(true);
    const [nodes, setNodes] = useState<Node[]>([]);
    const [edges, setEdges] = useState<Edge[]>([]);

    useEffect(() => {
        init();
    }, [session]);

    const init = useCallback(async () => {
        try {
            const { status, data: responseData } = await axios.get(`/v1/template/${id}`);
            const { data } = responseData;
            const { info, nodes, edges, options, orders } = data;
            setNodes(JSON.parse(nodes));
            setEdges(JSON.parse(edges));
            infoDispatch(initInfo(JSON.parse(info)));
            optionDispatch(initOption(JSON.parse(options)));
            orderDispatch(initOrder(JSON.parse(orders)));
        } catch (error) {
            // TODO: handle error
            console.error("error", error);
        } finally {
            setIsLoading(false);
        }
    }, [axios]);

    return isLoading ? <>loading...</> : <Workspace initialEdges={edges} initialNodes={nodes} />;
};

export default GeneratorTemplatePage;
