import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { DashboardService } from '../services/dashboard.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})


export class DashboardComponent implements OnInit {

  alertsData: any = [];
  recommendationData: any = [];
  alertsInitialCount: any = 0;


  testCount: any = 3;

  constructor
    (
      public dashboardService: DashboardService,
      private toastr: ToastrService,
      private cdref: ChangeDetectorRef
    ) {
  }

  ngOnInit() {
    this.getAllData();
    interval(10000).subscribe(() => this.getAllData());
  }

  ngAfterContentChecked() {

    this.cdref.detectChanges();

  }

  // Toaster Notification
  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }

  getStatData() {
    this.dashboardService.getDashboardStatistics().subscribe((res: any) => {
    });
  }

  getAlerts() {
    this.dashboardService.getAlerts().subscribe((res: any) => {
      console.log('alerts res:', res);
      if (res && res.data != null) {
        this.alertsData = res.data;
      }
    });
  }

  getRecommendation() {
    this.dashboardService.getRecommendation().subscribe((res: any) => {
      if (res && res.data != null)
        this.recommendationData = res.data;

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
