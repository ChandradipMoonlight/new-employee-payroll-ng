import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Employee } from '../../model/employee';
import { HttpService } from '../../service/http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  public employee: Employee = new Employee;
  public employeeFormGroup: FormGroup;

  departments: Array<any> = [
    {
      name: "HR",
      value: "HR",
      checked: false
    },
    {
      name: "Sales",
      value: "Sales",
      checked: false
    },
    {
      name: "Finance",
      value: "Finance",
      checked: false
    },
    {
      name: "Engineer",
      value: "Engineer",
      checked: false
    },
    {
      name: "Other",
      value: "Other",
      checked: false
    }
  ]

  /**
   * The Constructor is a default method of the class that is executed when the class is instantiated.
   * Constructor ensures proper initialization of fields (class members) in the class and its subclasses.
   * Angular Dependency Injector (DI) analyzes the constructor parameters.
   * Added Valiation to the Employee Payroll Form Data.
   * @param formBuilder 
   * @param httpService 
   * @param router 
   * @param activatedRoute 
   * @param dataService 
   */

  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dataService: DataService, 
    ) {
    this.employeeFormGroup = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.pattern("^[A-Z][a-zA-Z\\s]{2,}$")]),
      imagePath: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      department: this.formBuilder.array([], [Validators.required]),
      salary: new FormControl('', [Validators.required]),
      startDate: new FormControl('', [Validators.required]),
      notes: new FormControl('', [Validators.required]) 
    })
   }

   /**
    * ngOnInit is a life cycle hook called by Angular to indicate that the Angular is done creating the component.
    * 
    * I use get and set attributes to fetch all the employee data while updatating the employee data.
    * hence this method is called when Update method is triggered.
    */
  ngOnInit(): void {
    if(this.activatedRoute.snapshot.params['id'] !=undefined) {
      this.dataService.currentEmployee.subscribe(employee=>{
        if(Object.keys(employee).length !== 0) {
          this.employeeFormGroup.get("name")?.setValue(employee.name);
          this.employeeFormGroup.get("imagePath")?.setValue(employee.imagePath);
          this.employeeFormGroup.get("gender")?.setValue(employee.gender);
          const department: FormArray = this.employeeFormGroup.get('department') as FormArray;
          this.employeeFormGroup.get("startDate")?.setValue(employee.startDate);
          this.employeeFormGroup.get("salary")?.setValue(employee.salary);
          this.employeeFormGroup.get("notes")?.setValue(employee.notes);
          employee.department.forEach(departmentElements=> {
            for (let index = 0; index < this.departments.length; index++) {
              if(this.departments[index].name == departmentElements) {
                this.departments[index].checked = true;
                department.push(new FormControl(this.departments[index].value));
              }
            }
          })
        }
      });
    }
    console.log(this.employeeFormGroup);
  }

  /**
   * This method is used to capture the salary value form the slider.
   * 
   * @param value the value is seted in the interval of the 1000.
   * @returns value stored in the salary.
   */
  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }
    return value;
  }
  salary: number = 400000;
  updateSetting(event: any) {
    this.salary = event.value;
  }


  onCheckboxChange(event: MatCheckboxChange) {
    const department: FormArray = this.employeeFormGroup.get('department') as FormArray;

    if (event.checked) {
      department.push(new FormControl(event.source.value));
    } else {
      const index = department.controls.findIndex(x => x.value === event.source.value);
      department.removeAt(index);
    }
  }

  /**
   * this method is used to add the data which user has entered in the form when hit enter on the submit button.
   * it add the response to the home page. 
   * it has added the path of home page when user hit enter to the submit button it will navigate the home page 
   * with the help of router and add the response to the home page.
   */
  onSubmit(): void {
    if (this.activatedRoute.snapshot.params['id'] != undefined) {
      console.log(this.employeeFormGroup.value);
      this.httpService.updateEmployeeData(this.activatedRoute.snapshot.params['id'],
      this.employeeFormGroup.value).subscribe(Response =>{
        console.log(Response);
      this.router.navigateByUrl("/home");

      });
    } else{
    this.employee = this.employeeFormGroup.value;
    this.httpService.addEmployeeData(this.employee).subscribe(response=> {
      console.log(response);
      this.router.navigateByUrl("/home");
      });
    }
  }

   /**
   * This method validate the employee name and note
   * @param controlName
   * @param errorName 
   * @returns the error message when has error.
   */
    public checkError = (controlName: string, errorName: string) => {
      return this.employeeFormGroup.controls[controlName].hasError(errorName);
    }
  
}