import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivenodeComponent } from './activenode.component';

describe('ActivenodeComponent', () => {
  let component: ActivenodeComponent;
  let fixture: ComponentFixture<ActivenodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivenodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivenodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
