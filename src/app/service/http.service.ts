import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private mainUrl: string = "http://localhost:8082/"

  constructor(private httpClient: HttpClient) { }

  getEmployeeData(): Observable<any>{
    return this.httpClient.get(this.mainUrl+"get");
  }

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

  updateEmployeeData(id:any, data:any): Observable<any> {
    return this.httpClient.put(this.mainUrl + "update/" +id, data);
  }
}