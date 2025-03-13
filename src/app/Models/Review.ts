export interface Review {
    id:number;
    comment: string;
    classification: number;
    establishmentId: number;
    establishmentUsername?: string;
    clientId? : number;
    publicationId?: number;
}
