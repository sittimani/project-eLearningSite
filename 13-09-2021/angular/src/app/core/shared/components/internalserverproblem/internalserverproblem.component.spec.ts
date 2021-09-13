import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalserverproblemComponent } from './internalserverproblem.component';

describe('InternalserverproblemComponent', () => {
  let component: InternalserverproblemComponent;
  let fixture: ComponentFixture<InternalserverproblemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternalserverproblemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalserverproblemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
