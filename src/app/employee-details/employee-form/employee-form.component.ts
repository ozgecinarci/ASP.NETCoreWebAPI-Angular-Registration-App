/*import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';


@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {

  constructor(public empService:EmployeeService) { }

  ngOnInit(): void {
  }

}
*/
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmployeeService } from 'src/app/shared/employee.service';
import { Employee } from 'src/app/shared/employee.model';
 @Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
 })
 export class EmployeeFormComponent implements OnInit {
  constructor(public empService:EmployeeService) { }
  @ViewChild('checkbox1') checkBox:ElementRef;
  isSlide:string='off';
  ngOnInit() {
    this.empService.getDesignations().subscribe(data=> {
        this.empService.listDesignation=data;
    });
  }
  submit(form:NgForm)
  {
    this.empService.employeeData.isMarried=form.value.isMarried==true?1:0;
    this.empService.employeeData.isActive=form.value.isActive==true?1:0;
    if(this.empService.employeeData.id==0)
      this.insertEmployee(form);
     else
     this.updateEployee(form);
  }
  insertEmployee(myform:NgForm)
  {  this.empService.saveEmployee().subscribe(d=> {
     this.resetForm(myform);
     this.refereshData();
   
    });
  }
  updateEployee(myform:NgForm)
  {
    this.empService.updateEmployee().subscribe(d=> {
      this.resetForm(myform);
      this.refereshData();
    
    });
  }
  resetForm(myform:NgForm)
  {
    myform.form.reset(myform.value);
    this.empService.employeeData=new Employee();
    this.hideShowSlide();
  }
  refereshData()
  {
    this.empService.getEmployees().subscribe(res=>{
      this.empService.listEmployee=res;
    });
  }
  hideShowSlide()
  {
    if(this.checkBox.nativeElement.checked)
    {
      this.checkBox.nativeElement.checked=false;
      this.isSlide='off';
    }
    else
    {
      this.checkBox.nativeElement.checked=true;
      this.isSlide='on';
    }
  }
 }
