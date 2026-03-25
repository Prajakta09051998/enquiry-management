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
      this.getEnquiryById(id);
    }
  }
  getCategory() {
    this.http.get('http://localhost:3000/categories').subscribe((res: any) => {
      this.categories = res;
      console.log(this.categories,'categories');
      }
    )
  }
  getStatuses() {
    this.http.get('http://localhost:3000/statuses').subscribe((res: any) => {
      this.statuses = res;
      console.log(this.statuses,'status');
      }
    )
  }
getEnquiryById(id: any) {
  this.http.get('http://localhost:3000/enquiries/' + id)
    .subscribe((res: any) => {
      this.EnquiryModel = res;
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
  saveEnquiry(form: any) {
 if (form.invalid) {
    return; // stop submission
  }
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
      setTimeout(() => {
        this.router.navigate(['/enquiry-list']);
      }, 1000);
    },
    error: (err) => {
      console.log('API Error:', err);
      console.log('Error Body:', err.error);
    }
  });

}
  updateEnquiry(form: any) {
  if (form.invalid) {
    return;
  }
    const payload = {
    ...this.EnquiryModel,
    enquiryDate: new Date(this.EnquiryModel.enquiryDate).toISOString(),
    followUpDate: new Date(this.EnquiryModel.followUpDate).toISOString()
    };
    const id = this.EnquiryModel.id;
    console.log(id,'id');
    
          console.log('Updated Email:', payload);
    this.http.put('http://localhost:3000/enquiries' + '/' + id, payload).subscribe((res: any) => {
      console.log(res);
      alert('Enquiry updated successfully!');
      setTimeout(() => {
        this.router.navigate(['/enquiry-list']);
      }, 1000);
    });
  }
}
