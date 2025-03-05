import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ManagementService } from "../../../Services/management.service";


@Component({
    selector: 'app-publication-management',
    imports: [CommonModule, FormsModule],
    templateUrl: '././publicationManagement.component.html',
    styleUrls: ['./publicationManagement.component.css']
})
export class publicationManagementComponent{
    newPublication:{
        establishmentId: number;
        description: string;
        price: number;
        postDate: Date;
        endDate: Date;
        status: boolean;
    } = {
        establishmentId: 0,
        description: '',
        price: 0,
        postDate: new Date(),
        endDate: new Date(),
        status: false
    }
}