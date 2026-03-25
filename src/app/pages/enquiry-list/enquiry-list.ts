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
      console.log(this.enquiries,'enquiry');
    })
  }
  getStatuses() {
    this.http.get('http://localhost:3000/statuses').subscribe((res: any) => {
      this.statuses = res;
      console.log(this.statuses,'status');
      }
    )
  }
  editEnquiry(id:any){
    this.router.navigate(['/submit-enquiry', id]);
  }
 searchEnquiries() {

  this.filteredEnquiries = this.enquiries.filter((enquiry: any) => {

    let statusMatch = true;
    let dateMatch = true;

    // STATUS FILTER
    if (this.selectedStatus) {
      statusMatch = String(enquiry.statusId) === String(this.selectedStatus);
    }

    // DATE FILTER
    if (this.selectedDate) {

      const enquiryDate = new Date(enquiry.enquiryDate)
        .toISOString()
        .split('T')[0];

      dateMatch = enquiryDate === this.selectedDate;
    }

    return statusMatch && dateMatch;

  });

}
clearFilters() {
  this.selectedStatus = '';
  this.selectedDate = '';
  this.filteredEnquiries = [...this.enquiries];
}
}
