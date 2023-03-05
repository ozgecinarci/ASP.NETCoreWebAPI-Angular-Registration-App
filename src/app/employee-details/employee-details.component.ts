import { Component, OnInit } from '@angular/core';
import { Employee } from '../shared/employee.model';
import { EmployeeService } from '../shared/employee.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  constructor(public empService:EmployeeService) { }

  ngOnInit(): void {
    this.empService.getEmployees().subscribe(data=>{
      this.empService.listEmployee=data;
    });
  }



  populateEmployee(selecetedEmployee:Employee)

  {
    console.log(selecetedEmployee);
    this.empService.employeeData=selecetedEmployee;
  }
  delete(id:number)
  {
    if(confirm('Are you really want to delete this record?'))
    {
      this.empService.deleteEmployee(id).subscribe(data=> {
        this.empService.getEmployees().subscribe(data=>{
          this.empService.listEmployee=data;
          
        });
      },
      err=>{
      });
    }
  }

}
