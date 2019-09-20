import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule,HttpTestingController } from '@angular/common/http/testing';
import { HttpModule } from '@angular/http';
import { EmployeeService } from './employee.service';

describe('EmployeeService', () => {

  let httpMock : HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmployeeService],
      imports: [HttpClientTestingModule, HttpModule] //HttpModule needed for the http in the constructor of the service
    });
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    const service : EmployeeService = TestBed.get(EmployeeService);
    expect(service).toBeTruthy();
  });

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
