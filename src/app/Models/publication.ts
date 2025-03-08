import { Status } from "./Enums/Status";

export interface Publication {
    id: number;
    establishmentId: number;
    description: string;
    price: number;
    postDate: Date;
    endDate: Date;
    status: Status;
}