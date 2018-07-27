import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employees = [];
  error : String;
  
  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    //Suscribe to an observable
    this.employeeService.getEmployees()
    .subscribe(
      responseData => this.employees = responseData,
      error => this.error = error    //Error handling
    );
  }

}
