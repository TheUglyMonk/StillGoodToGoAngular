export interface Establishment{
    id: number;
    username:string;
    password:string;
    role: Role;
    description: string;
    categories: Category[];
    latitude : number;
    longitude : number;
    classification: number;
    status: Status;
}