import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from '../classes/student';
import { SharedService } from '../shared-services/shared.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  lstStudent :Student[];
  objStudent : Student;

  constructor(private _svc: SharedService,private router: Router) { 
    this.lstStudent = [];
    this.objStudent = new Student();
  }

  ngOnInit() {
    this.Get()
  }
  Get(){
    
    this._svc.GetDetails('Student').subscribe(
      data => {
        debugger;
        this.lstStudent = data;
        console.log(JSON.stringify(this.lstStudent));
      }, (err) => {
        alert("Some Error Occured.");
      });
  }
  clear(){
    this.objStudent = new Student();
  }
  viewteacher(){
    this.router.navigateByUrl('/teacher');
  }
  saveStudent(){
    debugger;
    this._svc.post(this.objStudent,'Student').subscribe(
      data => {
        debugger;
         alert("Saved.");
         this.Get();
         this.clear();
         // this.router.navigateByUrl('/Student');
      }, (err) => {
        alert("Some Error Occured.");
      });
  }

}
