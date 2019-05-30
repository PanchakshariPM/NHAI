import { Component, OnInit, Input } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { Router, ActivatedRoute } from '@angular/router';

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

  public isDashboard: any;

  constructor(public dashboardService: DashboardService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe((params: any) => {
      if (params.get('id') != '' && params.get('id') != undefined && params.get('id') != null) {
        this.isDashboard = false;
      } else {
        this.isDashboard = true;
      }
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
      this.router.navigate(['/views/toll-details', plazaInfo.toll_plaza_id])
    }
  }

}
