import { Edge, Node } from "reactflow";
import { saveAs } from "file-saver";
import { NodeOption } from "../_types/nodeOption";
import { Info } from "../_hooks/useInfo";
import { createSupplyChain } from "./suppliers";
import { createGlobalStore, createLocalStore } from "./store";

export const preview = (info: Info, nodes: Node[], edges: Edge[], options: NodeOption<any>[], orders: Record<string, string[]>): string[] => {
    const supplyChain = createSupplyChain(nodes, edges, options, orders);

    const content: string[] = [];
    let iteration = parseInt(info.iteration, 10);
    if (iteration > 5) iteration = 5;

    const global = createGlobalStore(nodes, options);

    for (let i = 0; i < iteration; i++) {
        const local = createLocalStore(nodes, options, global);
        content.push(supplyChain(global, local));
    }

    return content;
};

export const generate = (info: Info, nodes: Node[], edges: Edge[], options: NodeOption<any>[], orders: Record<string, string[]>) => {
    const supplyChain = createSupplyChain(nodes, edges, options, orders);

    const content: string[] = [];
    const iteration = parseInt(info.iteration, 10);

    const global = createGlobalStore(nodes, options);

    for (let i = 0; i < iteration; i++) {
        const local = createLocalStore(nodes, options, global);
        content.push(supplyChain(global, local));
    }

    saveAs(new Blob([content.join("\n")], { type: "text/plain;charset=utf-8" }), `${info.name}.csv`);
};
