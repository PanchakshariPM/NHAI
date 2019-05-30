import { Component, OnInit, Input } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.css']
})
export class RecommendationComponent implements OnInit {

  @Input() recommendationData: any = [];
  @Input() recommendationTotal: any = 0;

  // public recommendationData = [];

  // public recommendationTotal: any = this.recommendationData.length;
  public response: any;
  tollDataToBeSentToNextComp: any = {
    toll_plaza_id: '',
    toll_plaza_name: ''
  }

  constructor(public dashboardService: DashboardService, private router: Router,
    private spinnerService: Ng4LoadingSpinnerService
  ) {
  }

  ngOnInit() {
    this.spinnerService.show();
  }

  selectedPlaza(plazaInfo) {
    // console.log('selected Plaza:', plazaInfo);
    if (plazaInfo != null && plazaInfo != undefined) {
      this.tollDataToBeSentToNextComp.toll_plaza_id = plazaInfo.toll_plaza_id
      this.tollDataToBeSentToNextComp.toll_plaza_name = plazaInfo.toll_plaza_name
      this.dashboardService.tollPlazaInfoForTable$.next(this.tollDataToBeSentToNextComp);
      // console.log('data being sent:', this.tollDataToBeSentToNextComp);
      this.router.navigate(['/views/toll-details', plazaInfo.toll_plaza_id])
    }
  }

}
