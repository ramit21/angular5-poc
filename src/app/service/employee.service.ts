import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class EmployeeService {

  //Mocking backend call with hard coded data file 
  private _url : string = "assets/apidata/employeedata.json"; 
  //Change above url to some dummy value and see error handling as per the subscriber

  constructor(private _http: Http) { }

  getEmployees(){
    return this._http.get(this._url)
            .map((response:Response) => response.json());
            //Returning an Observable in JSON format
            //But somewhere this observable must be suscribed to (in Employee.component.ts) 
            //for this data to be utilized
  }
}
