import { Edge, Node } from "reactflow";
import { TERMINAL_NODE } from "./constants";
import { NodeOption, Supplier } from "@/types/generator";
import { createSupplyChian } from "./suppliers";

export * from "./constants";
export * from "./suppliers";

export const generate = (nodes: Node[], edges: Edge[], options: NodeOption<any>[], orders: Record<string, string[]>) => {
    const terminal = nodes.find((node) => node.id === TERMINAL_NODE.id);

    if (!terminal) throw new Error("cannot find terminal node");

    const supplyChain = createSupplyChian(terminal, { edges, nodes, options, orders });

    const content = generateFileContent(supplyChain);

    console.log(content);
};

const generateFileContent = (supplyChain: Supplier) => {
    const content: string[] = [];
    const store = {};

    for (let i = 0; i < 5; i++) {
        content.push(supplyChain(store));
    }

    return content.join("\n");
};
