import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Faq } from '../../../Models/Faq';
import { FaqsService } from '../../../Services/faqs.service';

@Component({
  selector: 'app-faq-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'faqs.component.html',
  styleUrls: ['./faqs.component.css']
})
export class FaqsComponent implements OnInit {
  faqs: Faq[] = [];

  constructor(private faqsService: FaqsService) { }

  ngOnInit(): void {
    this.faqsService.getFaqs().subscribe({
      next: (data) => this.faqs = data,
      error: (err) => console.error('Error fetching FAQs', err)
    });
  }
}
