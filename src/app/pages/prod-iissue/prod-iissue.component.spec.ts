import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdIissueComponent } from './prod-iissue.component';

describe('ProdIissueComponent', () => {
  let component: ProdIissueComponent;
  let fixture: ComponentFixture<ProdIissueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdIissueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdIissueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
