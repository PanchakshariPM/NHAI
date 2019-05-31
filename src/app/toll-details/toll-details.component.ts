import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import * as echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import { RestService } from '../services/rest.service';
import { DashboardService } from '../services/dashboard.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';


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
  alertsData: any = [];

  selectedFilter: any = {
    value: 'daily'
  };

  filters: any = [
    { value: 'daily', viewValue: 'Daily' },
    { value: 'weekly', viewValue: 'Weekly' },
    { value: 'monthly', viewValue: 'Monthly' }
  ];
  toRangePicker: any;
  fromRangePicker: any;

  optionForInbound: any = {
    // tooltip: {
    //   trigger: 'axis',
    //   axisPointer: {
    //     type: 'shadow',
    //     crossStyle: {
    //       color: '#999'
    //     }
    //   }
    // },
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
        min: '0',
        max: '-600',
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
        data: [],
        position: 'right'
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
        data: []
      }
    ]
  };


  optionForOutbound: any = {
    // tooltip: {
    //   trigger: 'axis',
    //   axisPointer: {
    //     type: 'shadow',
    //     crossStyle: {
    //       color: '#999'
    //     }
    //   }
    // },
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
        min: '0',
        max: '600',
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
        data: [],
        position: 'left'
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
        data: []
      }
    ]
  };

  optionForInboundForSimpleBarGraph = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
        crossStyle: {
          color: '#999'
        }
      }
    },
    xAxis: {
      type: 'category',
      name: '',
      nameLocation: 'middle',
      nameGap: '30',
      axisLine: {
        onZero: false,
        lineStyle: {
          color: 'white'
        }
      },
      splitLine: {
        show: false,
      },
      data: []
    },
    yAxis: {
      type: 'value',
      min: '0',
      max: '600',
      name: 'Meters',
      nameLocation: 'end',
      nameGap: '13',
      axisLine: {
        onZero: false,
        lineStyle: {
          color: 'white'
        }
      },
    },
    series: [{
      name: 'Average Congestion Length in mtrs.',
      data: [],
      type: 'bar'
    }]
  };
  contractorInfo: any;
  updatedOptionForInboundBarGraph: any;
  updatedOptionForOutBoundForSimpleBarGraph: any;

  optionForOutboundForSimpleBarGraph = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
        crossStyle: {
          color: '#999'
        }
      }
    },
    xAxis: {
      type: 'category',
      name: '',
      nameLocation: 'middle',
      nameGap: '30',
      axisLine: {
        onZero: false,
        lineStyle: {
          color: 'white'
        }
      },
      splitLine: {
        show: false,
      },
      data: []
    },
    yAxis: {
      type: 'value',
      min: '0',
      max: '600',
      name: 'Meters',
      nameLocation: 'end',
      // nameGap: '30',
      axisLine: {
        onZero: false,
        lineStyle: {
          color: 'white'
        }
      },
    },
    series: [{
      name: 'Average Congestion Length in mtrs.',
      data: [],
      type: 'bar'
    }]
  };




  optionForPeakHourCongestion = {
    color: ['#db7093', '#4682b4'],
    title: {
      text: '',
      subtext: ''
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
        crossStyle: {
          color: '#999'
        }
      }
    },
    // tooltip: {
    //   trigger: 'axis'
    // },
    legend: {
      show: true,
      padding: 1,
      textStyle: {
        color: 'white'
      },
      // activeColor: 'white',
      // itemGap: '12',
      // margin: 10,
      data: ['Inbound Congestion', 'Outbound Congestion']
    },
    // toolbox: {
    //   show: true,
    //   feature: {
    //     mark: { show: true },
    //     dataView: { show: true, readOnly: false },
    //     magicType: { show: true, type: ['line', 'bar'] },
    //     restore: { show: true },
    //     saveAsImage: { show: true }
    //   }
    // },
    calculable: true,
    xAxis: [
      {
        type: 'category',
        name: 'Last 24 Hours',
        nameGap: '39',
        nameLocation: 'middle',
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
        data: []
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: 'Meters',
        nameGap: '13',
        // min: '0',
        // max: '550',
        nameLocation: 'end',
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
          // formatter: '{value} °C'
        }
      }
    ],
    series: [
      {
        name: 'Inbound Congestion',
        type: 'line',
        data: [],
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
      },
      {
        name: 'Outbound Congestion',
        type: 'line',
        data: [],
        markPoint: {
          data: [
            { type: 'max', name: 'Peek' },
            { type: 'min', name: 'Low' }
          ]
        },
        markLine: {
          data: [
            { type: 'average', name: 'average' }
          ]
        }
      }
    ]
  };

  updatedOptionForPeekHourHourCongestion: any;

  objForLaneWiseGraph: any = {
    toll_plaza_id: ''
  }
  displayNoSensorsCondition: boolean = false;
  updatedOptionForInbound: any = {};
  updatedOptionForOutBound: any = {};

  objForgetGraphs: any = {
    toll_plaza_id: '',
    date: new Date()
  }

  public recommendationData = [];

  public recommendationTotal: any = this.recommendationData.length;
  public response: any;

  // public alertsData = [];

  public alertsTotal: any = this.alertsData.length;
  objForDailyGraph: any = {
    toll_plaza_id: ''
  }
  objForContractorInfo: any = {
    toll_plaza_id: ''
  }
  objForgetNewALertPlaza: any = {
    toll_plaza_id: ''
  }

  tollDataToBeSentToNextComp: any = {
    toll_plaza_id: '',
    toll_plaza_name: ''
  }


  constructor
    (
      public restService: RestService,
      public dashboardService: DashboardService,
      private router: Router, private activatedRoute: ActivatedRoute,
      private spinnerService: Ng4LoadingSpinnerService
    ) {

    this.activatedRoute.paramMap.subscribe((params: any) => {
      // console.log(params.get('id'));

      if (params.get('id') != "" && params.get('id') != undefined && params.get('id') != null) {
        this.tollDataToBeSentToNextComp.toll_plaza_id = params.get('id');
        this.dashboardService.tollPlazaInfoForTable$.next(this.tollDataToBeSentToNextComp);
      }
    });

    this.spinnerService.show();

    this.dashboardService.dashboardAlertResponse.subscribe((res) => {
      this.recommendationData = res.data;
      this.recommendationTotal = this.recommendationData ? this.recommendationData.length : [];
    });

    this.dashboardService.dashboardAlertResponse.subscribe((res) => {
      this.alertsData = res.data;
      this.alertsTotal = this.alertsData ? this.alertsData.length : [];
    });


    this.dashboardService.tollPlazaInfoForTable.subscribe(response => {
      if (response != null && response != undefined) {
        this.objForLaneWiseGraph.toll_plaza_id = parseInt(response.toll_plaza_id);
        this.objForgetGraphs.toll_plaza_id = parseInt(response.toll_plaza_id);
        this.objForDailyGraph.toll_plaza_id = parseInt(response.toll_plaza_id);
        this.objForContractorInfo.toll_plaza_id = parseInt(response.toll_plaza_id);
        this.objForgetNewALertPlaza.toll_plaza_id = parseInt(response.toll_plaza_id);

        this.restService.dailygraphversion2(this.objForLaneWiseGraph).subscribe(response => {
          // console.log('res from dailyGraphV2:', response);

          if (response.data != null && response.data != undefined) {


            this.optionForInbound.series[0].data = [];
            this.updatedOptionForInbound = {};

            this.optionForOutbound.series[0].data = [];
            this.updatedOptionForOutBound = {};

            response.data.traffic_A.forEach(element => {
              let itemStyle = {
                color: element.color
              }

              let graphObj = {
                value: element.value * -1,
                itemStyle: itemStyle
              }

              this.optionForInbound.series[0].data.push(graphObj);
              let temp = [];

              response.data.x_axis.forEach(element => {
                temp.push(element);
              });

              this.optionForInbound.yAxis[0].data = temp;
              this.optionForOutbound.yAxis[0].data = temp;


              this.updatedOptionForInbound = Object.assign({}, this.optionForInbound);

            });


            response.data.traffic_B.forEach(element => {
              let itemStyle = {
                color: element.color
              }
              let graphObj = {
                value: element.value,
                itemStyle: itemStyle
              }
              this.optionForOutbound.series[0].data.push(graphObj);
              this.updatedOptionForOutBound = Object.assign({}, this.optionForOutbound);
            });

          } else if (!response.data) {
            this.displayNoSensorsCondition = true;
          }
          this.spinnerService.hide();
        })
      }
    })

    this.restService.getgraphs(this.objForgetGraphs).subscribe(response => {


      this.optionForInboundForSimpleBarGraph.series[0].data = [];
      this.optionForInboundForSimpleBarGraph.xAxis.data = [];
      this.updatedOptionForInboundBarGraph = {};

      this.optionForOutboundForSimpleBarGraph.series[0].data = [];
      this.optionForOutboundForSimpleBarGraph.xAxis.data = [];
      this.updatedOptionForOutBoundForSimpleBarGraph = {};

      response.daily_inbound.forEach(element => {
        this.optionForInboundForSimpleBarGraph.series[0].data.push(element.graph);
        this.optionForInboundForSimpleBarGraph.xAxis.data.push(element.hour);
        this.optionForInboundForSimpleBarGraph.xAxis.name = 'Hour of day';
        this.updatedOptionForInboundBarGraph = Object.assign({}, this.optionForInboundForSimpleBarGraph);
      })

      response.daily_outbound.forEach(element => {
        this.optionForOutboundForSimpleBarGraph.series[0].data.push(element.graph);
        this.optionForOutboundForSimpleBarGraph.xAxis.data.push(element.hour);
        this.optionForOutboundForSimpleBarGraph.xAxis.name = 'Hour of day';
        this.updatedOptionForOutBoundForSimpleBarGraph = Object.assign({}, this.optionForOutboundForSimpleBarGraph);
      })
    })


    this.restService.dailygraph(this.objForDailyGraph).subscribe(response => {
      // console.log('res from dailygraph:', response);

      this.optionForPeakHourCongestion.series[0].data = [];
      this.optionForPeakHourCongestion.xAxis[0].data = [];
      this.optionForPeakHourCongestion.series[1].data = [];
      // this.optionForPeakHourCongestion.xAxis[1].data = [];

      response.inbound.forEach(element => {
        this.optionForPeakHourCongestion.series[0].data.push(element.graph);
        this.optionForPeakHourCongestion.xAxis[0].data.push(element.hour);
      });

      response.outbound.forEach(element => {
        this.optionForPeakHourCongestion.series[1].data.push(element.graph);
      });

      this.updatedOptionForPeekHourHourCongestion = Object.assign({}, this.optionForPeakHourCongestion)
    })

    this.contractor_info();


    this.restService.getNewALertPlaza(this.objForgetNewALertPlaza).subscribe(response => {
      this.alertsData = response.data;
    })

    this.restService.getPlazaRecommendation(this.objForgetNewALertPlaza).subscribe(response => {
      this.recommendationData = response.data;
    })
  }



  ngOnInit() {
  }

  contractor_info() {
    this.restService.contractor_info(this.objForContractorInfo).subscribe(response => {
      // console.log('res for contractor_info:', response);
      this.contractorInfo = response.data;
    })
  }



  selectedParameter() {
    this.objForgetGraphs.date.toUTCString();

    if (this.objForgetGraphs.date && this.selectedFilter.value) {

      this.restService.getgraphs(this.objForgetGraphs).subscribe(response => {
        // console.log('res for getgraphsAPI:', response);

        this.optionForInboundForSimpleBarGraph.series[0].data = [];
        this.optionForInboundForSimpleBarGraph.xAxis.data = [];
        this.updatedOptionForInboundBarGraph = {};

        this.optionForOutboundForSimpleBarGraph.series[0].data = [];
        this.optionForOutboundForSimpleBarGraph.xAxis.data = [];
        this.updatedOptionForOutBoundForSimpleBarGraph = {};

        if (this.selectedFilter.value == 'daily') {


          response.daily_inbound.forEach(element => {
            this.optionForInboundForSimpleBarGraph.series[0].data.push(element.graph);
            this.optionForInboundForSimpleBarGraph.xAxis.data.push(element.hour);
            this.optionForInboundForSimpleBarGraph.xAxis.name = 'Hour of day';
            this.updatedOptionForInboundBarGraph = Object.assign({}, this.optionForInboundForSimpleBarGraph);
          })

          response.daily_outbound.forEach(element => {
            this.optionForOutboundForSimpleBarGraph.series[0].data.push(element.graph);
            this.optionForOutboundForSimpleBarGraph.xAxis.data.push(element.hour);
            this.optionForOutboundForSimpleBarGraph.xAxis.name = 'Hour of day';
            this.updatedOptionForOutBoundForSimpleBarGraph = Object.assign({}, this.optionForOutboundForSimpleBarGraph);
          })
        }

        if (this.selectedFilter.value == 'weekly') {

          response.weekly_inbound.forEach(element => {
            this.optionForInboundForSimpleBarGraph.series[0].data.push(element.graph);
            this.optionForInboundForSimpleBarGraph.xAxis.data.push(element.day);
            this.optionForInboundForSimpleBarGraph.xAxis.name = 'Day of week'
            this.updatedOptionForInboundBarGraph = Object.assign({}, this.optionForInboundForSimpleBarGraph);
          })

          response.weekly_outbound.forEach(element => {
            this.optionForOutboundForSimpleBarGraph.series[0].data.push(element.graph);
            this.optionForOutboundForSimpleBarGraph.xAxis.data.push(element.day);
            this.optionForOutboundForSimpleBarGraph.xAxis.name = 'Day of week'
            this.updatedOptionForOutBoundForSimpleBarGraph = Object.assign({}, this.optionForOutboundForSimpleBarGraph);
          })
        }

        if (this.selectedFilter.value == 'monthly') {

          response.monthly_inbound.forEach(element => {
            this.optionForInboundForSimpleBarGraph.series[0].data.push(element.graph);
            this.optionForInboundForSimpleBarGraph.xAxis.data.push(element.day);
            this.optionForInboundForSimpleBarGraph.xAxis.name = 'Day of month';
            this.updatedOptionForInboundBarGraph = Object.assign({}, this.optionForInboundForSimpleBarGraph);
          })

          response.monthly_outbound.forEach(element => {
            this.optionForOutboundForSimpleBarGraph.series[0].data.push(element.graph);
            this.optionForOutboundForSimpleBarGraph.xAxis.data.push(element.day);
            this.optionForOutboundForSimpleBarGraph.xAxis.name = 'Day of month';
            this.updatedOptionForOutBoundForSimpleBarGraph = Object.assign({}, this.optionForOutboundForSimpleBarGraph);
          })
        }

      })
    }



  }

}
