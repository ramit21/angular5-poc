import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeComponent } from './employee.component';
import { EmployeeService } from '../service/employee.service';

import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';

describe('EmployeeComponent', () => {
  let component: EmployeeComponent;
  let fixture: ComponentFixture<EmployeeComponent>;

  let employee = {};
  class FakeEmployeeService{
    getEmployees(){
      return Observable.of(""); //return an observable from the fake service
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeComponent ],
      //Giving the mocked service in providers
      providers: [ { provide: EmployeeService, useClass: FakeEmployeeService} ] 
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('CALL Employee service', () => {
    expect(component).toBeTruthy();
  });
});
