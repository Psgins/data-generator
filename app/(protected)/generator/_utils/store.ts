import { Node } from "reactflow";
import { NodeType } from "../_types/nodeType";
import { NodeOption } from "../_types/nodeOption";
import { RandomNumberOption } from "../_types/nodeOptions";

export type GeneratorStorage = Record<Node["id"], string | number>;

const randomNumber = (option: NodeOption<RandomNumberOption>) => {
    const allowNumber = option.data.allowNumber.map((value, index) => (value ? index : null)).filter((number) => number !== null);
    if (allowNumber.length === 0) return 0;
    const position = Math.floor(Math.random() * allowNumber.length);
    const value = allowNumber[position];
    if (typeof value === "undefined" || value === null) throw new Error("cannot random number from number list");
    return value;
};

export const createGlobalStore = (nodes: Node[], options: NodeOption<any>[]) =>
    nodes.reduce<GeneratorStorage>((global, node) => {
        if (node.type === NodeType.COUNTER) {
            global[node.id] = 0;
            return global;
        }
        if (node.type === NodeType.RANDOM_NUMBER) {
            const option = options.find((option) => option.id === node.id);
            if (!option) throw new Error("option not found");
            if ((option as NodeOption<RandomNumberOption>).data.isMemory) {
                const value = randomNumber(option);
                global[node.id] = value;
            }
            return global;
        }
        return global;
    }, {});

export const createLocalStore = (nodes: Node[], options: NodeOption<any>[], global: GeneratorStorage) =>
    nodes.reduce<GeneratorStorage>((local, node) => {
        if (node.type === NodeType.COUNTER) {
            let value = global[node.id];
            if (typeof value === "undefined") throw new Error("counter is missing from global storage");
            if (typeof value !== "number") throw new Error("counter in global storage is not a number");
            value++;
            global[node.id] = value;
            local[node.id] = value;
            return local;
        }
        if (node.type === NodeType.RANDOM_NUMBER) {
            const option = options.find((option) => option.id === node.id);
            if (!option) throw new Error("option not found");
            if (!(option as NodeOption<RandomNumberOption>).data.isMemory) {
                const value = randomNumber(option);
                local[node.id] = value;
            }
            return local;
        }
        return local;
    }, {});
