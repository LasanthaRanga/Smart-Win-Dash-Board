import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SysrefComponent } from './sysref.component';

describe('SysrefComponent', () => {
  let component: SysrefComponent;
  let fixture: ComponentFixture<SysrefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SysrefComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SysrefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
