// user.component.ts
import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../Services/client.service';
import { SaleService } from '../../Services/sale.service';
import { Sale } from '../../Models/Sale';
import { NgForOf, NgIf } from '@angular/common';


@Component({
  selector: 'app-user',
  imports: [NgIf, NgForOf],
  standalone: true,
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  loading = true;
  userInfo: any;
  sales: Sale[] = [];

  constructor(
    private clientService: ClientService,
    private saleService: SaleService
  ) { }

  ngOnInit(): void {
    this.getUserInfo();
    this.getSales();
  }

  getUserInfo() {
    // Get user info from the API
    this.clientService.getUserInfo().subscribe((data) => {
      this.userInfo = data;
      this.loading = false;
    });
  }

  getSales() {
    // Get the sales data for the client
    this.saleService.getSales().subscribe((data) => {
      console.log('Sales Data:', data); // Log sales data to inspect
      this.sales = data;
    });
  }
}
