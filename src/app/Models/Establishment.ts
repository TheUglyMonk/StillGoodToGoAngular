import { Category } from "./Enums/Category";
import { Role } from "./Enums/Role";
import { Status } from "./Enums/Status";

export interface Establishment {
    id: number;
    role: number;
    username: string;
    publication: any | null;
    email: string;
    password: string | null;
    description: string;
    latitude: number;
    longitude: number;
    classification: number;
    categories: number[];
    active: boolean;
  }