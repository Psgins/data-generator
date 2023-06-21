"use client";

import { FC, useCallback, useEffect } from "react";
import Workspace from "./_components/Workspace";
import useIncomerOrder, { initOrder, initialOrders } from "./_hooks/useIncomerOrder";
import useOption, { initOption, initialOption } from "./_hooks/useOptions";
import useInfo, { initInfo, initialInfo } from "./_hooks/useInfo";
import { initFlowStore, useFlowStore } from "./_hooks/useFlowStore";
const GeneratorPage: FC = () => {
    const [_flowStore, flowStoreDispatch] = useFlowStore();
    const [_info, infoDispatch] = useInfo();
    const [_options, optionDispatch] = useOption();
    const [_orders, orderDispatch] = useIncomerOrder();

    useEffect(() => {
        init();
    }, []);

    const init = useCallback(() => {
        flowStoreDispatch(initFlowStore());
        infoDispatch(initInfo(initialInfo));
        optionDispatch(initOption(initialOption));
        orderDispatch(initOrder(initialOrders));
    }, [flowStoreDispatch, initInfo, optionDispatch, orderDispatch]);

    return <Workspace />;
};

export default GeneratorPage;
