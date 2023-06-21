export interface ResponseStatus {
    code: string;
    message: string;
}

export interface ResponseModel<T> {
    status: ResponseStatus;
    data: T;
}
