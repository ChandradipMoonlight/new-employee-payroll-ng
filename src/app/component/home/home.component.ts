import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../service/http.service';
import { Employee } from '../../model/employee';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  //Declaration of the variable name

  public employeeCount: Number = 10;

  public employeeDetails: Employee[] = [];

  /**
   * The Constructor is a default method of the class that is executed when the class is instantiated.
   * Constructor ensures proper initialization of fields (class members) in the class and its subclasses.
   * Angular Dependency Injector (DI) analyzes the constructor parameters.
   * Added Valiation to the Employee Payroll Form Data.
   * @param httpService 
   * @param router 
   * @param route 
   * @param dataService 
   */
  constructor(private httpService: HttpService,
              private router: Router,
              private route: ActivatedRoute,
              private dataService: DataService
              ) { }

  /**
   * This method is used to get the employee data in the home page.
   * it will add all data as response in the home page which user has filled in the form home page.
   */
  ngOnInit(): void {
    this.httpService.getEmployeeData().subscribe(Response=>{
      this.employeeDetails = Response.data;
      this.employeeCount = this.employeeDetails.length;
      console.log(this.employeeDetails);
    });
  }

  /**
   * This method is used to delete the recored from the home page.
   * when user click on the delete icon it triggered the delete method and delete recored
   * for perticular id form the database and also remove the recored form the home page.
   * when recored get deleted home page get refreshed.
   * @param id remove() is invoked for a particular employee id.
   */
  remove(id: number) {
    this.httpService.deleteEmployeeData(id).subscribe(data=> {
      console.log(data);
      this.ngOnInit();      
    });
  }

  /**
   * This method is used to upadate the recored for perticular id.
   * When the remove() is hit, the employee gets deleted from the database and also the details is removed from the HOME page.
   * Thus, a refreshed home page is rendered and a remove message is displayed to the user.
   * 
   * @param employee is Object of the Employee Class which is used to update data for perticular id.
   */
  update(employee : Employee) {
    this.dataService.changeEmployee(employee);
    this.router.navigateByUrl('update/' + employee.id);
  }

}
