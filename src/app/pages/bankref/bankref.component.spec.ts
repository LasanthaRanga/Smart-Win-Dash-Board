import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankrefComponent } from './bankref.component';

describe('BankrefComponent', () => {
  let component: BankrefComponent;
  let fixture: ComponentFixture<BankrefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankrefComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BankrefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
