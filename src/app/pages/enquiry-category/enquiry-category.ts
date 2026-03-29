import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // Import FormsModule

@Component({
  selector: 'app-enquiry-category',
  imports: [CommonModule, FormsModule],
  templateUrl: './enquiry-category.html',
  styleUrl: './enquiry-category.scss',
})
export class EnquiryCategory {
 enquiriesData: any[] = [];
  filteredEnquiries: any[] = []; // Array to hold filtered enquiries
  statusFilter: string = 'all'; // Default filter
  enquiryTypeFilter: string = 'all'; // Default filter
  startDateFilter: string = ''; // Default start date filter
  endDateFilter: string = ''; // Default end date filter

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getEnquiry();
  }
  getEnquiry() {
    this.http.get('http://localhost:3000/enquiries').subscribe((res: any) => {
      this.enquiriesData = res; 
      this.filteredEnquiries = res;
      console.log(this.enquiriesData, 'enquiries fetched');
    });
  }
  filterData() {
    let filteredData = this.enquiriesData;
    if (this.statusFilter !== 'all') {
      filteredData = filteredData.filter(item => item.status === this.statusFilter);
    }

    if (this.enquiryTypeFilter !== 'all') {
      filteredData = filteredData.filter(item => item.enquiryType.toLowerCase() === this.enquiryTypeFilter.toLowerCase());
    }

    if (this.startDateFilter) {
      filteredData = filteredData.filter(item => new Date(item.enquiryDate) >= new Date(this.startDateFilter));
    }

    if (this.endDateFilter) {
      filteredData = filteredData.filter(item => new Date(item.enquiryDate) <= new Date(this.endDateFilter));
    }

    this.filteredEnquiries = filteredData; // Update the filtered enquiries array
  }

  exportToCSV() {
    const csvData = this.filteredEnquiries.map(e => `${e.id},${e.name},${e.status},${e.enquiryDate},${e.followUpDate},${e.feedback}`).join('\n');
    const blob = new Blob([csvData], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'report.csv';
    link.click();
  }

  // Function to export the data as Excel
  exportToExcel() {
    const ws = XLSX.utils.json_to_sheet(this.filteredEnquiries);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Enquiries');
    XLSX.writeFile(wb, 'report.xlsx');
  }

}
