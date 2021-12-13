import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../classes/login';
import { SharedService } from '../shared-services/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  lstLogin: Login[];
  objLogin: Login;
  isAdmin: boolean =false;
  isTeacher: boolean = false;
  isStudent: boolean = false;
  constructor(private router: Router,private _svc: SharedService) {
    this.lstLogin = [];
    this.objLogin =new  Login();
   }

  ngOnInit() {
    debugger;
    //sessionStorage.SetItem('type',"")
    // var x =    sessionStorage.getItem('type')
    // if(x.toLocaleLowerCase() == 'admin'){
    //    this.isAdmin = true; 
    // }
    this.Get();
  }
  getlogin(){
    //LoginUser
    debugger;
    var x = this.lstLogin.filter(y=> y.Email == this.objLogin.Email && this.objLogin.Password == y.Password)[0];
    if(x != undefined ){
      if(x.Type.toLocaleLowerCase() == 'teacher'){
      sessionStorage.setItem('type','teacher')
     // this.router.navigateByUrl('/teacher');
     this.isTeacher = true;
      }
      if(x.Type.toLocaleLowerCase() == 'student'){
        sessionStorage.setItem('type','student')
        this.isStudent = true;
       // this.router.navigateByUrl('/student');
      }
      if(x.Type.toLocaleLowerCase() == 'admin'){
        sessionStorage.setItem('type','admin')
        this.isAdmin = true;
      }
    }
    else {
      alert("invalid User Name")
    }

  }
  Get(){
    this._svc.GetDetails('User').subscribe(
      data => {
        this.lstLogin = data;
        // this.router.navigateByUrl('/teacher');
        // console.log(JSON.stringify(this.lstLogin));
      }, (err) => {
        alert("Some Error Occured.");
      });
  }
  goto(name:any){
    this.router.navigateByUrl(name);
  }
}
