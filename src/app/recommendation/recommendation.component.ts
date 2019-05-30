import { Component, OnInit, Input } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';

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

  constructor(
    public dashboardService: DashboardService
  ) {
    // this.dashboardService.dashboardRecommendationResponse.subscribe((res) => {
    //   this.recommendationData = res.data;
    //   this.recommendationTotal = this.recommendationData ? this.recommendationData.length : [];
    // });
  }

  ngOnInit() {
  }

}
