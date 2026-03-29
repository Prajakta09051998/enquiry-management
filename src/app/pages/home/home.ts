import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { webConfig } from '../../configuration';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';
@Component({
  selector: 'app-home',
  imports: [RouterLink, CommonModule, BaseChartDirective],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  enquiries: any[] = [];
  constructor(private http: HttpClient) {
  }
  ngOnInit() {
    this.getEnquiry();
  }
  pieChartType: ChartType = 'pie';

  pieChartData: ChartConfiguration<'pie'>['data'] = {
    labels: ['Converted', 'Not Converted'],
    datasets: [
      {
        data: [0, 0],
        backgroundColor: ['#28a745', '#dc3545']
      }
    ]
  };
  statuses = [
    { id: '1', name: 'New' },
    { id: '2', name: 'In Progress' },
    { id: '3', name: 'Follow-up Required' },
    { id: '4', name: 'Resolved' },
    { id: '5', name: 'Closed' }
  ];
  getEnquiry() {
    this.http.get<any[]>('http://localhost:3000/enquiries')
      .subscribe((res) => {
        this.enquiries = res;
        const statusCounts = this.statuses.map(status => {
          return res.filter(e => String(e.statusId) === status.id).length;
        });
        this.pieChartData = {
          labels: this.statuses.map(s => s.name),
          datasets: [
            {
              data: statusCounts,
              backgroundColor: [
                '#007bff', // New
                '#ffc107', // In Progress
                '#17a2b8', // Follow-up
                '#28a745', // Resolved
                '#6c757d'  // Closed
              ]
            }
          ]
        };

        console.log(statusCounts, 'status counts');
      });
  }
}
