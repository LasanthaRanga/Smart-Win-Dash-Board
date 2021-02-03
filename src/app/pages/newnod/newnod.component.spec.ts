import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewnodComponent } from './newnod.component';

describe('NewnodComponent', () => {
  let component: NewnodComponent;
  let fixture: ComponentFixture<NewnodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewnodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewnodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
