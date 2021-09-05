import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegonlineComponent } from './regonline.component';

describe('RegonlineComponent', () => {
  let component: RegonlineComponent;
  let fixture: ComponentFixture<RegonlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegonlineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegonlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
