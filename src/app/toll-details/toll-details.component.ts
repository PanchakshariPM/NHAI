import { Component, OnInit } from '@angular/core';
import * as echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import { RestService } from '../services/rest.service';
import { DashboardService } from '../services/dashboard.service';


export interface Food {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-toll-details',
  templateUrl: './toll-details.component.html',
  styleUrls: ['./toll-details.component.css']
})
export class TollDetailsComponent implements OnInit {

  data: any = [Math.random() * 300]


  foods: Food[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' }
  ];
  toRangePicker: any;
  fromRangePicker: any;

  optionForInbound: any = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
        crossStyle: {
          color: '#999'
        }
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'value',
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed',
            color: '#ffffff'
          }
        },
        axisLine: {
          onZero: false,
          lineStyle: {
            color: 'white'
          }
        },
        show: true,
        // min: '0',
        // max: '-600',
        axisLabel: {
          show: true,
          formatter: function (value) {
            var str = value.toString();
            if (str.length > 1) {
              var res = str.substring(1, str.length);
              return res;
            } else {
              return value;
            }
          }
        }
      }
    ],
    yAxis: [
      {
        type: 'category',
        axisLine: {
          onZero: false,
          lineStyle: {
            color: 'white'
          }
        },
        axisTick: { show: true },
        data: ['Lane1', 'Lane2', 'Lane3', 'Lane4', 'Lane5', 'Lane6'],
      }
    ],
    series: [
      {
        name: '',
        type: 'bar',
        stack: '',
        itemStyle: {
          normal: {
            label: {
              show: false,
            }
          }
        },
        data: [
          {
            value: -220,
            itemStyle: { color: '#fb8c00' },
            // green 40dc7e
            // amber:fb8c00
          },
          {
            value: -300,
            itemStyle: { color: '#ff0000' },
          },
          {
            value: -150,
            itemStyle: { color: '#fb8c00' },
          },
          {
            value: -220,
            itemStyle: { color: '#fb8c00' },
          },
          {
            value: -300,
            itemStyle: { color: '#ff0000' },
          },
          {
            value: -100,
            itemStyle: { color: '#40dc7e' },
          }
        ]
      }
    ]
  };


  optionForOutbound: any = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
        crossStyle: {
          color: '#999'
        }
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'value',
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed',
            color: 'white'
          }
        },
        axisLine: {
          onZero: false,
          lineStyle: {
            color: 'white'
          }
        },
        show: true,
        // min: '0',
        // max: '600',
      }
    ],
    yAxis: [
      {
        type: 'category',
        axisLine: {
          onZero: false,
          lineStyle: {
            color: 'white'
          }
        },
        axisTick: { show: true },
        data: ['Lane1', 'Lane2', 'Lane3', 'Lane4', 'Lane5', 'Lane6'],
        position: 'right'
      }
    ],
    series: [
      {
        name: '',
        type: 'bar',
        stack: '',
        label: {
          normal: {
            show: false,
            position: 'left'
          }
        },
        data: [
          {
            value: 220,
            itemStyle: { color: '#fb8c00' },
          },
          {
            value: 250,
            itemStyle: { color: '#ff0000' },
          },
          {
            value: 100,
            itemStyle: { color: '#40dc7e' },
          },
          {
            value: 220,
            itemStyle: { color: '#fb8c00' },
          },
          {
            value: 300,
            itemStyle: { color: '#ff0000' },
          },
          {
            value: 100,
            itemStyle: { color: '#40dc7e' },
          }
        ]
      }
    ]
  };

  option = {
    xAxis: {
      type: 'category',
      axisLine: {
        onZero: false,
        lineStyle: {
          color: 'white'
        }
      },
      splitLine: {
        show: false,
      },
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value',
      axisLine: {
        onZero: false,
        lineStyle: {
          color: 'white'
        }
      },
    },
    series: [{
      data: [
        {
          value: 200,
          itemStyle: { color: '#ff0000' },
        },
        {
          value: 100,
          itemStyle: { color: '#fa7b79' },
        },
        {
          value: 500,
          itemStyle: { color: '#40dc7e' },
        },
        {
          value: 200,
          itemStyle: { color: '#ff0000' },
        },
        {
          value: 100,
          itemStyle: { color: '#fa7b79' },
        },
        {
          value: 200,
          itemStyle: { color: '#ff0000' },
        },
        {
          value: 100,
          itemStyle: { color: '#fa7b79' },
        }
      ],
      type: 'bar'
    }]
  };

  optionForPeakHourCongestion = {
    title: {
      text: '',
      subtext: ''
    },
    tooltip: {
      trigger: 'axis'
    },
    calculable: true,
    xAxis: [
      {
        type: 'category',
        splitLine: {
          show: false
        },
        axisLine: {
          onZero: false,
          lineStyle: {
            color: 'white'
          }
        },
        boundaryGap: false,
        data: ['1', '2', '3', '4', '5', '6', '7']
      }
    ],
    yAxis: [
      {
        type: 'value',
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed',
            color: '#ffffff'
          }
        },
        axisLine: {
          onZero: false,
          lineStyle: {
            color: 'white'
          }
        },
        axisLabel: {
          formatter: '{value} °C'
        }
      }
    ],
    series: [
      {
        name: 'Test',
        type: 'line',
        data: [11, 11, 15, 13, 12, 13, 10],
        markPoint: {
          data: [
            { type: 'max', name: 'Peek' },
            { type: 'min', name: 'Low' }
          ]
        },
        markLine: {
          data: [
            { type: 'average', name: 'Moderate' }
          ]
        }
      }
    ]
  };

  objForLaneWiseGraph: any = {
    toll_plaza_id: ''
  }

  updatedOptionForInbound: any = {};

  public recommendationData = [];

  public recommendationTotal: any = this.recommendationData.length;
  public response: any;

  public alertsData = [];

  public alertsTotal: any = this.alertsData.length;


  constructor
    (
      public restService: RestService,
      public dashboardService: DashboardService
    ) {


    this.dashboardService.dashboardAlertResponse.subscribe((res) => {
      this.recommendationData = res.data;
      this.recommendationTotal = this.recommendationData ? this.recommendationData.length : [];
    });

    this.dashboardService.dashboardAlertResponse.subscribe((res) => {
      this.alertsData = res.data;
      this.alertsTotal = this.alertsData ? this.alertsData.length : [];
    });

    // this.dashboardService.tollPlazaInfoForTable.subscribe(response => {
    //   // console.log('res from Observable:', response);
    //   if (response != null && response != undefined) {
    //     this.objForLaneWiseGraph.toll_plaza_id = parseInt(response.toll_plaza_id);

    //     // console.log('-----', this.objForLaneWiseGraph);

    //     this.restService.dailygraphversion2(this.objForLaneWiseGraph).subscribe(response => {
    //       console.log('res from dailyGraphV2:', response);
    //       // console.log('-----', this.objForLaneWiseGraph);


    //       if (response.data != null && response.data != undefined) {

    //         response.data.traffic_A.forEach(element => {
    //           let itemStyle = {
    //             color: element.color
    //           }

    //           let graphObj = {
    //             value: element.value * -1,
    //             itemStyle: itemStyle
    //           }

    //           this.optionForInbound.series[0].data.push(graphObj);
    //           // this.updatedOptionForInbound = Object.assign({}, this.optionForInbound);

    //           let temp = [];

    //           response.data.x_axis.forEach(element => {
    //             let temp = [];
    //             temp.push(element);
    //             // this.optionForOutbound.yAxis.data.push(element);
    //           });
    //           this.optionForInbound.yAxis[0].data = temp;

    //           this.updatedOptionForInbound = Object.assign({}, this.optionForInbound);

    //         });


    //       }

    //     })
    //   }
    // })

  }

  ngOnInit() {
  }


}
