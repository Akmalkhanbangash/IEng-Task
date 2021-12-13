import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../classes/login';
import { Student } from '../classes/student';
import { Teacher } from '../classes/teacher';
import { SharedService } from '../shared-services/shared.service';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {

  lstTeacher: Teacher[];
  objTeacher: Teacher;
  lstStudent : Student[];
 isAdmin: boolean = false;
 isTeacher: boolean = false;
 isStudent: boolean = false;
  constructor(private router: Router,private _svc: SharedService) {
    this.lstTeacher = [];
    this.objTeacher = new Teacher();
    this.lstStudent = [];
   }

  ngOnInit() {
    var s = sessionStorage.getItem('type')
      if(s.toLocaleLowerCase() == 'teacher'){
        this.isTeacher = true;
      }
      else if(s.toLocaleLowerCase() == 'student'){
        this.isStudent = true;
      }
      else if(s.toLocaleLowerCase() == 'admin'){
        this.isAdmin = true;
      }
      else{
        this.router.navigateByUrl('/login');
      }
    this.Get();
  }
  Get(){
    if(this.isTeacher){
      this._svc.GetDetails('Student').subscribe(
        data => {
          debugger;
          this.lstStudent = data;
          console.log(JSON.stringify(this.lstStudent));
        }, (err) => {
          alert("Some Error Occured.");
        });
    }
    else {
      this._svc.GetDetails('Teacher').subscribe(
        data => {
          debugger;
          this.lstTeacher = data;
          this.router.navigateByUrl('/teacher');
          console.log(JSON.stringify(this.lstTeacher));
        }, (err) => {
          alert("Some Error Occured.");
        });
  
    }
  }
  clear(){
    this.objTeacher = new Teacher();
  }
  saveTeacher(){
    debugger;
    this._svc.post(this.objTeacher,'Teacher').subscribe(
      data => {
        debugger;
         alert("Saved.");
         this.Get();
         this.clear();
         // this.router.navigateByUrl('/teacher');
      }, (err) => {
        alert("Some Error Occured.");
      });
  }

}
