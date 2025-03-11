import { StatusRequest } from "./Enums/StatusRequest";
import { Category } from "./Enums/Category";

export interface Requisition {
    id: number;
    userName: string;
    email: string;
    password: string;
    latitude: number;
    longitude: number;
    description: string;
    category: Category[];
    statusRequest: StatusRequest;
}