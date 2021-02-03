import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointComComponent } from './point-com.component';

describe('PointComComponent', () => {
  let component: PointComComponent;
  let fixture: ComponentFixture<PointComComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PointComComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PointComComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
