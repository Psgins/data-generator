import { Edge, Node } from "reactflow";
import { NodeOption } from "../_types/nodeOption";
import { Info } from "../_hooks/useInfo";
import { createSupplyChain } from "./suppliers";
import { createGlobalStore, createLocalStore } from "./store";

export const generate = (info: Info, nodes: Node[], edges: Edge[], options: NodeOption<any>[], orders: Record<string, string[]>) => {
    const supplyChain = createSupplyChain(nodes, edges, options, orders);

    const content: string[] = [];
    const iteration = parseInt(info.iteration, 10);

    const global = createGlobalStore(nodes, options);

    for (let i = 0; i < iteration; i++) {
        const local = createLocalStore(nodes, options, global);
        content.push(supplyChain(global, local));
    }

    console.log(content.join("\n"));
};
