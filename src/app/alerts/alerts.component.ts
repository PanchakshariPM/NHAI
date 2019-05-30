import { Component, OnInit, Input } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit {

  @Input() alertsData: any = [];
  @Input() alertsTotal: any = 0;

  public response: any;

  constructor(public dashboardService: DashboardService) {
  }

  ngOnInit() {
  }

}
