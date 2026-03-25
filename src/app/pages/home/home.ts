import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { webConfig } from '../../configuration';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [RouterLink, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  enquiries: any[] = [];
  constructor(private http: HttpClient, private router: Router) {
  }
  ngOnInit() {
      this.getEnquiry();
    }
    getEnquiry() {
      this.http.get('http://localhost:3000/enquiries').subscribe((res: any) => {
        this.enquiries = res.slice(0, 3);
        console.log(this.enquiries,'enquiry');
      })
    }
}
