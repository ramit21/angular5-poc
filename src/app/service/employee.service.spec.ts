import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule,HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { EmployeeService } from './employee.service';

describe('EmployeeService', () => {

  let httpMock : HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmployeeService],
      imports: [HttpClientTestingModule]
    });
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', inject([EmployeeService], (service: EmployeeService) => {
    expect(service).toBeTruthy();
  }));

  it('getEmployees returns employees data', (done) => {
    const employeeService : EmployeeService = TestBed.get(EmployeeService);
    employeeService.getEmployees().subscribe(res => {
        expect(res).toEqual({"id": 1, "name" : "Ramit", "game": "tt"});
        done();
    });
    
    let dataRequest = httpMock.expectOne('assets/apidata/employeedata.json');
    dataRequest.flush({"id": 1, "name" : "Ramit", "game": "tt"});
    httpMock.verify();
  });


});
