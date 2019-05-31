import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import { LineToLineMappedSource } from 'webpack-sources';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-pms',
  templateUrl: './pms.component.html',
  styleUrls: ['./pms.component.css']
})
export class PmsComponent implements OnInit {

  colors = ["#90FF33", "#33FF99", "#33FF3C", "#FFD700", "#FFFF33", "#33FFDA", "#33FFA2", "#99FF33", "#33F6FF",
    "#33FF33", "#7CFC00", "#00FFFF", "#FF0000", "#DC143C", "#7CFC00"];
  model: any;
  date: any;

  foods = [
    { value: 'steak-0', viewValue: 'Karnataka' },
    { value: 'pizza-1', viewValue: 'Andra' },
    { value: 'tacos-2', viewValue: 'Maharastra' }
  ];

  chartOption = {
    color: this.colors,
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
        crossStyle: {
          color: '#999'
        }
      }
    },
    legend: {
      show: true,
      data: [],
      textStyle: {
        color: 'white'
      }
    },
    grid: {
      top: 70,
      bottom: 50
    },
    xAxis: [
      {
        type: 'category',
        axisTick: {
          alignWithLabel: true
        },
        axisLine: {
          onZero: false,
          lineStyle: {
            color: 'white'
          }
        },
        axisPointer: {},
        data: []
      }
    ],
    yAxis: [
      {
        type: 'value',
        axisLine: {
          onZero: false,
          lineStyle: {
            color: 'white'
          }
        },
      }
    ],
    series: []
  };

  public updatedOption: any;

  data: any;
  options: any;
  themeSubscription: any;
  objForGraph: any = {
    toll_id: '',
    entry_date: new Date('12/03/2018')
  };
  selectedPlaza: any = {
    toll_plaza_id: 10007,
    toll_plaza_name: "Vantada"
  }
  dropDownValue: any = [];
  min = new Date('12/02/2018');
  max = new Date();
  selectedItem: any;
  dataAvailable: boolean = true;
  displayNoDataAvailable: boolean = false;

  constructor(
    public restService: RestService,
    private datePipe: DatePipe
  ) {

    this.restService.getnhaitcm().subscribe(response => {
      if (response.data != null && response.data != undefined) {
        console.log('res of getnhaitcm:', response.data);
        this.dropDownValue = response.data

      }
    })
    this.selectedPlazaName();
  }

  ngOnInit() {

  }


  ngOnDestroy(): void {
    // this.themeSubscription.unsubscribe();
  }


  getPMSData() {
    this.restService.nhai_api_new(this.objForGraph).subscribe(response => {

      this.chartOption.xAxis[0].data = [];
      this.chartOption.series = [];

      if (!response.data) {
        this.displayNoDataAvailable = true
        this.dataAvailable = false;
      } else if (response.data) {
        this.displayNoDataAvailable = false
        this.dataAvailable = true;
      }

      if (response.hasOwnProperty('data')) {
        this.chartOption.xAxis[0].data = response.labels;
        response.data.forEach(element => {
          element['smooth'] = true;
          this.chartOption.series.push(element);
          this.chartOption.legend.data.push(element.name);
        });
      } else {
        this.chartOption.xAxis[0].data = [];
        this.chartOption.series = [];
      }


      this.updatedOption = Object.assign({}, this.chartOption)
    })
  }

  selectedPlazaName() {
    this.objForGraph.entry_date = this.datePipe.transform(this.objForGraph.entry_date, "yyyy-MM-dd");

    if (this.objForGraph.entry_date && this.selectedPlaza.toll_plaza_id) {
      this.objForGraph.toll_id = this.selectedPlaza.toll_plaza_id;
      this.getPMSData()
    }

  }

}

