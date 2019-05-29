import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';


@Component({
  selector: 'app-toll-count-info',
  templateUrl: './toll-count-info.component.html',
  styleUrls: ['./toll-count-info.component.css']
})
export class TollCountInfoComponent implements OnInit {

  public statsData: any = {
    data: {
      high: { lastMonth: 0, yestarday: 0, lastWeek: 0, now: 0 },
      low: { lastMonth: 0, yestarday: 0, lastWeek: 0, now: 0 },
      moderate: { lastMonth: 0, yestarday: 0, lastWeek: 0, now: 0 }
    },
    total: 0
  };
  public totalTollPlazas = '590';



  constructor(public dashboardService: DashboardService) {
    this.dashboardService.dashboardStatResponse.subscribe((res) => {
      console.log(res);
      this.statsData = res ? res : this.statsData;
    });
  }

  ngOnInit() {
  }

}
