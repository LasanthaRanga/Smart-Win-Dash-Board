import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankprocessComponent } from './bankprocess.component';

describe('BankprocessComponent', () => {
  let component: BankprocessComponent;
  let fixture: ComponentFixture<BankprocessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankprocessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BankprocessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
