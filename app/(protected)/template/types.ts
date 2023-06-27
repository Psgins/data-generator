import { Info } from "../generator/_hooks/useInfo";

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
