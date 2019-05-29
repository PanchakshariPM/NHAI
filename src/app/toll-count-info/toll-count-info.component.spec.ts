import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TollCountInfoComponent } from './toll-count-info.component';

describe('TollCountInfoComponent', () => {
  let component: TollCountInfoComponent;
  let fixture: ComponentFixture<TollCountInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TollCountInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TollCountInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
