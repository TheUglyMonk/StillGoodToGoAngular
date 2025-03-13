import { PaymentMethod } from "./Enums/PaymentMethod";
import { Review } from "./Review";

export interface Sale {
    id: number;
    price: number;
    date: number[];
    review: Review | null;
    publicationId: number;
    establishmentId: number;
    clientId: number;
    establishmentName?: string; 
    paymentMethod?: PaymentMethod;
  }
  