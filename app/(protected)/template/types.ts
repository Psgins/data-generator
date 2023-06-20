import { Info } from "@/types/generator";

export interface TemplateResponseData {
    id: number;
    info: string;
    createdAt: string;
}

export interface Template {
    id: number;
    info: Info;
    createdAt: string;
}
