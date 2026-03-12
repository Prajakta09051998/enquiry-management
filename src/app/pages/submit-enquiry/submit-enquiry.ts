import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { webConfig } from '../../configuration';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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
  today: string = '';
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
    enquiryDate: '',
    followUpDate: '',
    feedback: '',
  }
  constructor(private http: HttpClient, private route: ActivatedRoute,private router: Router) {
  }

  ngOnInit() {
    const date = new Date();
    this.today = date.toISOString().split('T')[0];
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
getEnquiryById(id: any) {
  this.http.get(webConfig.GetEnquiryById + id)
    .subscribe((res: any) => {
      this.EnquiryModel = res.data;
      if (this.EnquiryModel.enquiryDate) {
        this.EnquiryModel.enquiryDate =
          this.EnquiryModel.enquiryDate.split('T')[0];
      }
      if (this.EnquiryModel.followUpDate) {
        this.EnquiryModel.followUpDate =
          this.EnquiryModel.followUpDate.split('T')[0];
      }
      console.log(this.EnquiryModel, 'edit data');
    });
}
  saveEnquiry() {

  const payload = {
    ...this.EnquiryModel,
    enquiryDate: new Date(this.EnquiryModel.enquiryDate).toISOString(),
    followUpDate: new Date(this.EnquiryModel.followUpDate).toISOString()
  };

  console.log('Request Payload:', payload);

  this.http.post('http://localhost:3000/enquiries', payload).subscribe({
    next: (res: any) => {
      console.log('Success:', res);
      alert('Enquiry submitted successfully!');
    },
    error: (err) => {
      console.log('API Error:', err);
      console.log('Error Body:', err.error);
    }
  });

}
  updateEnquiry() {
    const payload = {
    ...this.EnquiryModel,
    enquiryDate: new Date(this.EnquiryModel.enquiryDate).toISOString(),
    followUpDate: new Date(this.EnquiryModel.followUpDate).toISOString()
    };
    const id = payload.enquiryId;
          console.log('Updated Email:', payload);
    this.http.put(webConfig.UpdateEnquiry + '/' + id, payload).subscribe((res: any) => {
      console.log(res);
      alert('Enquiry updated successfully!');
      setTimeout(() => {
        this.router.navigate(['/enquiry-list']);
      }, 1000);
    });
  }
}
