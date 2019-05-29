import { Component, OnInit } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  constructor(public dashboardService: DashboardService) { }

  ngOnInit() {
    this.getAllData();
    interval(10000).subscribe(() => this.getAllData());
  }

  getStatData() {
    this.dashboardService.getDashboardStatistics().subscribe((res: any) => {

    });
  }

  getAlerts() {
    this.dashboardService.getAlerts().subscribe((res: any) => {

    });
  }

  getRecommendation() {
    this.dashboardService.getRecommendation().subscribe((res: any) => {

    });
  }

  getTableData() {
    this.dashboardService.getTollTableData().subscribe((res: any) => {

    });
  }

  getFullTollDetail() {
    this.dashboardService.getTollTableData().subscribe((res: any) => {

    });
  }

  getAllData() {
    this.getAlerts();
    this.getStatData();
    this.getTableData();
    this.getRecommendation();
  }

}
