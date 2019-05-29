import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

export interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  mode = new FormControl('over');
  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
  model: any;

  foods: Food[] = [
    { value: 'steak-0', viewValue: 'Karnataka' },
    { value: 'pizza-1', viewValue: 'Andra' },
    { value: 'tacos-2', viewValue: 'Maharastra' }
  ];

  constructor() { }

  ngOnInit() {
  }

}
