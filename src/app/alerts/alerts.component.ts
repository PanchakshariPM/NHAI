import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit {

  public alertsData = [];

  public alertsTotal: any = this.alertsData.length;

  public response: any;

  constructor(public dashboardService: DashboardService) {
    this.dashboardService.dashboardAlertResponse.subscribe((res) => {
      this.alertsData = res.data;
      this.alertsTotal = this.alertsData ? this.alertsData.length : [];
    });

  }

  ngOnInit() {
  }

}
