import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConpayComponent } from './conpay.component';

describe('ConpayComponent', () => {
  let component: ConpayComponent;
  let fixture: ComponentFixture<ConpayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConpayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConpayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
