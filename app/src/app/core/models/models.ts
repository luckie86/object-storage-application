export interface Response {
    status: number;
    token: Text;
    data?: string;
}

export interface User {
    id: number;
    userName: string;
    password: string;
}