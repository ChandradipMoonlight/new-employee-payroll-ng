import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private mainUrl: string = "http://localhost:8082/"

  constructor(private httpClient: HttpClient) { }

  /**
   * Purpose: this methos is used to request the GET http method.
   * it fetch the employee data form the database.
   * 
   * @returns the repsonse message of the GET method
   */
  getEmployeeData(): Observable<any>{
    return this.httpClient.get(this.mainUrl+"get");
  }

  /**
   * Purpse: This method is used to POST request method to hit the HTTP server.
   * @param employee :- employee details wil stored into the database.
   * @returns Post request response message.
   */

  addEmployeeData(employee: any): Observable<any> {
    return this.httpClient.post(this.mainUrl+"add", employee);
  }

  /**
   * Purpose : DELETE request method to hit the HTTP server.
   * @param id employee_id for which the delete action needs to be taken.
   * @returns the delete request response.
   */

   deleteEmployeeData(id:any): Observable<any> {
    return this.httpClient.delete(this.mainUrl + "delete/" +id);
  }

  /**
   * Purpose: this method is used to hit the PUT http method to update the recored.
   * 
   * @param id id employee_id for which the update action needs to be taken.
   * @param data employee details to be updated in the database.
   * @returns the put request response.
   */
  updateEmployeeData(id:any, data:any): Observable<any> {
    return this.httpClient.put(this.mainUrl + "update/" +id, data);
  }
}