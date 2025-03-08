import { Category } from "./Enums/Category";
import { Role } from "./Enums/Role";
import { Status } from "./Enums/Status";

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