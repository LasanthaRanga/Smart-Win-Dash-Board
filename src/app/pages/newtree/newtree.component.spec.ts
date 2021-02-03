import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewtreeComponent } from './newtree.component';

describe('NewtreeComponent', () => {
  let component: NewtreeComponent;
  let fixture: ComponentFixture<NewtreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewtreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewtreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
