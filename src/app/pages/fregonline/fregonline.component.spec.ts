import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FregonlineComponent } from './fregonline.component';

describe('FregonlineComponent', () => {
  let component: FregonlineComponent;
  let fixture: ComponentFixture<FregonlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FregonlineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FregonlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
