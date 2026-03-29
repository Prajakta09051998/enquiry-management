import { Component, Inject } from '@angular/core';
import { webConfig } from '../../configuration';
import { HttpClient } from '@angular/common/http';
import { CommonModule, DatePipe, NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-enquiry-list',
  imports: [CommonModule, DatePipe, FormsModule],
  templateUrl: './enquiry-list.html',
  styleUrl: './enquiry-list.scss',
})
export class EnquiryList {
  selectedStatus: string = '';
  selectedDate: string = '';
  enquiries: any[] = [];
  filteredEnquiries: any[] = [];
  statuses: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 6;
  totalPages: number = 0;

  constructor(private http: HttpClient, private router: Router) {
  }
  ngOnInit() {
    this.getEnquiry();
    this.getStatuses();
  }
  getEnquiry() {
    this.http.get('http://localhost:3000/enquiries').subscribe((res: any) => {
      this.enquiries = res;
      this.filteredEnquiries = res;
      this.updatePagination();
      console.log(this.enquiries, 'enquiry');
    })
  }
  getStatuses() {
    this.http.get('http://localhost:3000/statuses').subscribe((res: any) => {
      this.statuses = res;
      console.log(this.statuses, 'status');
    }
    )
  }
  editEnquiry(id: any) {
    this.router.navigate(['/submit-enquiry', id]);
  }
  searchEnquiries() {

    this.filteredEnquiries = this.enquiries.filter((enquiry: any) => {

      let statusMatch = true;
      let dateMatch = true;
      if (this.selectedStatus) {
        statusMatch = String(enquiry.statusId) === String(this.selectedStatus);
      }
      if (this.selectedDate) {

        const enquiryDate = new Date(enquiry.enquiryDate)
          .toISOString()
          .split('T')[0];

        dateMatch = enquiryDate === this.selectedDate;
      }
      return statusMatch && dateMatch;
    });
  this.currentPage = 1; 
  this.updatePagination();
  }
  clearFilters() {
    this.selectedStatus = '';
    this.selectedDate = '';
    this.filteredEnquiries = [...this.enquiries];
    this.currentPage = 1;
    this.updatePagination();
  }
  get paginatedEnquiries() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredEnquiries.slice(start, end);
  }

  // Update total pages
  updatePagination() {
    this.totalPages = Math.ceil(this.filteredEnquiries.length / this.itemsPerPage);
  }
}
