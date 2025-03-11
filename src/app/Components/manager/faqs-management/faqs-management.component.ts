import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FaqsService } from '../../../Services/faqs.service';
import { Faq } from '../../../Models/Faq';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-faqs-management',
  templateUrl: './faqs-management.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  styleUrls: ['./faqs-management.component.css']
})
export class FaqsManagementComponent implements OnInit {
  faqs: Faq[] = [];
  faqForm: FormGroup;
  editingFaq: Faq | null = null;

  constructor(
    private faqsService: FaqsService,
    private fb: FormBuilder
  )
   {
    // Initialize the form
    this.faqForm = this.fb.group({
      question: ['', Validators.required],
      answer: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadFaqs();
  }

  loadFaqs(): void {
    // Get the list of FAQs
    this.faqsService.getFaqs().subscribe((data) => {
      this.faqs = data;
    });
  }

  onSubmit(): void {
    if (this.faqForm.invalid) return;

    if (this.editingFaq) {
      // If editing an existing FAQ, update it
      this.faqsService.updateFaq(this.editingFaq.id, this.faqForm.value).subscribe((updatedFaq) => {
        // Update the FAQ list with the new data
        const index = this.faqs.findIndex(faq => faq.id === updatedFaq.id);
        if (index !== -1) {
          this.faqs[index] = updatedFaq;
        }
        this.clearForm();
      });
    } else {
      // If not editing, create a new FAQ
      this.faqsService.createFaq(this.faqForm.value).subscribe((newFaq) => {
        this.faqs.push(newFaq); // Add the new FAQ to the list
        this.clearForm();
      });
    }
  }

  clearForm(): void {
    this.faqForm.reset();
    this.editingFaq = null;
  }

  editFaq(faq: Faq): void {
    // Populate the form with the selected FAQ for editing
    this.faqForm.setValue({
      question: faq.question,
      answer: faq.answer
    });
    this.editingFaq = faq;
  }

  deleteFaq(id: number): void {
    this.faqsService.deleteFaq(id).subscribe(() => {
      // Remove the FAQ from the list after deletion
      this.faqs = this.faqs.filter(faq => faq.id !== id);
    });
  }
}
