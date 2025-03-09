export interface Sale {
    id: number;
    price: number;
    date: number[];
    review: string | null;
    publicationId: number;
    establishmentId: number;
    clientId: number;
    establishmentName?: string; 
  }
  