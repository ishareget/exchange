import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreloginComponent } from './storelogin.component';

describe('StoreloginComponent', () => {
  let component: StoreloginComponent;
  let fixture: ComponentFixture<StoreloginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreloginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
