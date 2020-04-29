interface Location {
    id: string;
    name: string;
}

export interface Response {
    userId: string;
    id: string;
    name: string;
    location: Location;
}

export interface User {
    id: number;
    userName: string;
    password: string;
}
