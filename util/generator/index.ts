import { Edge, Node } from "reactflow";
import { NodeOption } from "@/types/generator";
import { createSupplyChain } from "./suppliers";
import { Info } from "@/app/new/_hooks/useInfo";
import { createGlobalStore, createLocalStore } from "./store";

export * from "./constants";
export * from "./suppliers";

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
