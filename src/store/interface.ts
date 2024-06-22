export interface ListenerSubscription {
    remove: () => void;
}

export interface SearchPayload {
    query?: string,
    page?: number,
    collection?: number,
    limit?: number,
}


export interface DeletePayload  {
    records: string[]
}

export interface IResponse {
    status: boolean;
    success: boolean;
    status_code: number;
    response?: string;
    message: string;
    data?: unknown; 
}

export interface PaginatedResponse<T> extends IResponse {
    data: {
        data: T[];
        next?: number;
        total?: number
    }
}



export interface CreateResponse<T> extends IResponse {
    data: T
}

export interface CreateMultipleResponse<T> extends IResponse {
    data: T[]
}

export interface ReadResponse<T> extends IResponse {
    data: T
}

export interface DeleteResponse<T> extends IResponse {
    data?: T[]
}