import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TollTableComponent } from './toll-table.component';

describe('TollTableComponent', () => {
  let component: TollTableComponent;
  let fixture: ComponentFixture<TollTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TollTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TollTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
