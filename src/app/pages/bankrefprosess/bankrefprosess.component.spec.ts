import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankrefprosessComponent } from './bankrefprosess.component';

describe('BankrefprosessComponent', () => {
  let component: BankrefprosessComponent;
  let fixture: ComponentFixture<BankrefprosessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankrefprosessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BankrefprosessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
