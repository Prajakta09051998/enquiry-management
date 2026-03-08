import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { webConfig } from '../../configuration';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-submit-enquiry',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './submit-enquiry.html',
  styleUrls: ['./submit-enquiry.scss'],
})
export class SubmitEnquiry implements OnInit {
  isEdit = false;
  statuses: any[] = [];
  categories: any[] = [];
  EnquiryModel: any = {
    enquiryId: 0,
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    message: '',
    categoryId: 0,
    statusId: 0,
    enquiryType: '',
    isConverted: false,
    enquiryDate: new Date(),
    followUpDate: new Date(),
    feedback: '',
  }
  constructor(private http: HttpClient, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.getCategory();
    this.getStatuses();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.getEnquiryById(+id);
    }
  }
  getCategory() {
    this.http.get(webConfig.GetCategory).subscribe((res: any) => {
      const data = res.data;
      this.categories = data.filter(
        (item: any, index: number, self: any[]) =>
          index === self.findIndex(t => t.categoryName === item.categoryName)
      );
      console.log(this.categories,'categories');
      }
    )
  }
  getStatuses() {
    this.http.get(webConfig.Getstatuses).subscribe((res: any) => {
      const data = res.data;
      this.statuses = data.filter(
        (item: any, index: number, self: any[]) =>
          index === self.findIndex(t => t.statusName === item.statusName)
      );
      console.log(this.statuses,'status');
      }
    )
  }
  getEnquiryById(id:any){
    this.http.get(webConfig.GetEnquiryById + id)
    .subscribe((res:any)=>{
      this.EnquiryModel = res.data;
      console.log(this.EnquiryModel,'edit data');
    })
  }
  saveEnquiry() {
    this.http.post(webConfig.SaveEnquiry, this.EnquiryModel).subscribe((res: any) => {
      console.log(res);
      alert('Enquiry submitted successfully!');
    });
  }
  updateEnquiry() {
    const id = this.EnquiryModel.enquiryId;
    this.http.put(webConfig.UpdateEnquiry + '/' + id, this.EnquiryModel).subscribe((res: any) => {
      console.log(res);
      alert('Enquiry updated successfully!');
    });
  }
}
