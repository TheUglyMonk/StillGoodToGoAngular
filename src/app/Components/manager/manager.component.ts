import { Component } from '@angular/core';
import { SaleManagementComponent } from './sale-management/sale-management.component';
import { EstablishmentManagementComponent } from './establishment-management/establishment-management.component';
import { NgIf } from '@angular/common';
import { FaqsManagementComponent } from './faqs-management/faqs-management.component';

@Component({
  selector: 'app-manager',
  standalone: true,
  imports: [NgIf,FaqsManagementComponent, SaleManagementComponent, EstablishmentManagementComponent],
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.css'
})
export class ManagerComponent {
  selectedSection: string = 'faqs';

  // This function sets the selected section
  setSection(section: string) {
    console.log(`Selected section: ${section}`); // Debugging log
    this.selectedSection = section;
  }
}
