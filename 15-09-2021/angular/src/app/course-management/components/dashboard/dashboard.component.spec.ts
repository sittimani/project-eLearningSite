import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { MaterialModule } from 'src/app/material/material.module';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MaterialModule,
        ToastrModule.forRoot()
      ],
      declarations: [ DashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return format value', () => {
    const temp = {
      name: "mani",
      workingAt: "kongunade"
    }
    const element = {
      email: "mkd@gmail.com",
      _id: "1231231"
    }
    const result = {
      name: "mani",
      workingAt: "kongunade",
      email: "mkd@gmail.com",
      _id: "1231231"
    }
    expect(component.formatDataToDisplay(temp, element)).toEqual(result)
  })
});
