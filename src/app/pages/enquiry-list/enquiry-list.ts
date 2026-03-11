import { Component, Inject } from '@angular/core';
import { webConfig } from '../../configuration';
import { HttpClient } from '@angular/common/http';
import { CommonModule, DatePipe, NgFor } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-enquiry-list',
  imports: [NgFor, DatePipe],
  templateUrl: './enquiry-list.html',
  styleUrl: './enquiry-list.scss',
})
export class EnquiryList {
  enquiries: any[] = [];
  constructor(private http: HttpClient, private router: Router) {
  }
  ngOnInit() {
    this.getEnquiry();
  }
  getEnquiry() {
    this.http.get(webConfig.GetEnquiry).subscribe((res: any) => {
      this.enquiries = res.data.slice(0, 10);
      console.log(this.enquiries,'enquiry');
    })
  }
  editEnquiry(id:any){
    this.router.navigate(['/submit-enquiry', id]);
  }
}
