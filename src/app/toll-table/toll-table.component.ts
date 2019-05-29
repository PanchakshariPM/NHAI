import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toll-table',
  templateUrl: './toll-table.component.html',
  styleUrls: ['./toll-table.component.css']
})
export class TollTableComponent implements OnInit {

  public tableHeader = ['Sl No', 'Toll Name', 'Inbound Direction', 'Inbound Congestion', 'Outbound Direction',
    'Outbound Congestion', 'State', 'NH No', 'Contract Company'];

  public tableData = [];

  public response: any;

  tollDataToBeSentToNextComp: any = {
    toll_plaza_id: '',
    toll_plaza_name: ''
  }

  constructor
    (
      public dashboardService: DashboardService,
      private router: Router
    ) {
    this.response = this.dashboardService.dashboardTableResponse;
    this.dashboardService.dashboardTableResponse.subscribe((res) => {
      this.tableData = res.data;
      //this.alertsTotal = this.alertsData ? this.alertsData.length : [];
    });
  }

  ngOnInit() {
  }


  selectedPlaza(plazaInfo) {
    // console.log('selected Plaza:', plazaInfo);
    if (plazaInfo != null && plazaInfo != undefined) {
      this.tollDataToBeSentToNextComp.toll_plaza_id = plazaInfo.toll_plaza_id
      this.tollDataToBeSentToNextComp.toll_plaza_name = plazaInfo.toll_plaza_name
      this.dashboardService.tollPlazaInfoForTable$.next(this.tollDataToBeSentToNextComp);
      // console.log('data being sent:', this.tollDataToBeSentToNextComp);
      this.router.navigate(['/views/toll-details'])
    }
  }


}