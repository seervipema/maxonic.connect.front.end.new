import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import {AuthenticationService } from '../_services/authentication.service';
import {FormBuilder,FormGroup,Validators} from "@angular/forms";
import {first} from 'rxjs/operators';
import {ImageSliderDataService} from '../_services/image-slider-data.service';
import {AdminService} from '../_services/admin.service';
import {
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver,
  ComponentRef,
  ComponentFactory
} from '@angular/core';


declare var $: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent  implements OnInit  {
  
  LoginForm:FormGroup
  isAdminLoggedIn:boolean=false;
  SignPasswordMessage:string="Password should not be empty !!!";
  SignEmailMessage:string="Email should not be empty !!!";
  SignUpDOBMessage:string="Date of birth should not be empty !!!";
  isForgotPasswordClicked:boolean=false;
  isLoginForgotEmailEmpty:boolean=false;
  isLoginpPasswordEmpty:boolean=false;
  isLoginpEmailEmpty:boolean=false;
  isAnotherComponentClicked:boolean=false;
  isLoggedIn:boolean=false;
  isToggled:boolean=false;
  submitted = false;
  loading = false;
  returnUrl: string;
  error = '';
  email:string;
  token:string
  // message:boolean;
  componentRef: any;
  @ViewChild('slidercontainer', { read: ViewContainerRef }) entry: ViewContainerRef;
  constructor( 
    private router:Router,
    private authenticationService :AuthenticationService ,
    private resolver: ComponentFactoryResolver,
    private data:AdminService,
    private route: ActivatedRoute
    ) {
      if(localStorage.getItem('email')==='pema@maxonic.com' || localStorage.getItem('email')==='paduka@maxonic.com' || localStorage.getItem('email')==='nishant@maxonic.com'){
        this.isAdminLoggedIn=true;
      }else{
        this.isAdminLoggedIn=false;
      }
     }
     getNotification(evt) {
      // Do something with the notification (evt) sent by the child!
      if(evt){
        this.isLoggedIn=true;
      }else{
        this.isLoggedIn=false;
      }
  }
  ngOnInit() {
    
    // this.data.emailMessage.subscribe((message)=>{
    //   console.log("mesage",message);
    //   if(message){
    //      //do nothing
    //   }else{
    //     this.authenticationService.check_JWT_IS_VALID().pipe(first()).subscribe(
    //       result=>{
    //         if(result["failed"]){
    //             this.authenticationService.logout();
    //             // this.router.navigateByUrl('/');
    //             // if(localStorage.getItem('currentUser')){
    //             //   this.isLoggedIn=true;
    //             //  }else{
    //             //   this.isLoggedIn=false;
    //             //  }
    //             this.isLoggedIn=false;
                 
    //         }else{
    //           // console.log("Token is still valid")
    //           // if(localStorage.getItem('currentUser')){
    //           //   this.isLoggedIn=true;
    //           //  }else{
    //           //   this.isLoggedIn=false;
    //           //  }
    //           this.isLoggedIn=true;
    //         }
    //       }
    //     ) 
    //   }
    // })
    
    this.data.currentMessage.subscribe(message =>
      {
         this.isLoggedIn = message
        //  console.log(this.isLoggedIn)
      }
         )
         this.data.isAdminLogged.subscribe(message =>
          {
             this.isAdminLoggedIn = message
            //  console.log(this.isLoggedIn)
          }
             )
      
     if(localStorage.getItem('email')==='pema@maxonic.com' || localStorage.getItem('email')==='paduka@maxonic.com' || localStorage.getItem('email')==='nishant@maxonic.com'){
       this.isAdminLoggedIn=true;
     }else{
       this.isAdminLoggedIn=false;
     }
     
    
  //   // this.router.navigateByUrl('intranet');
 
   
   
  }
  onSignOutClicked(){
  localStorage.removeItem('currentUser');
  localStorage.removeItem('isLoggedIn');
  if(localStorage.getItem('currentUser')){
    this.isLoggedIn=true;
   }else{
    this.isLoggedIn=false;
   }
  } 
 onNavBarLoginClicked(){
  this.router.navigateByUrl('login');
 }
 onNavBarSignUpClicked(){
   this.router.navigateByUrl('sign-up');
 }
destroyComponent() {
  if(this.componentRef){
    this.componentRef.destroy();
  }
}
onResolvedQueriesClicked(){
  this.router.navigateByUrl('resolved-queries');
}
onResetPasswordClicked(){
   this.router.navigateByUrl('reset-password');
}
onGenerateQueryClicked(){
  this.router.navigateByUrl('home');
}
onViewQueryClicked(){
  this.router.navigateByUrl('view-queries');
}
onResetPasswordForEmployeeClicked(){
  this.router.navigateByUrl('admin-reset-password');
}
onInProgressClicked(){
  this.router.navigateByUrl('in-progress');
}
onResolvedQueriesForOthersClicked(){
  this.router.navigateByUrl('resolved-queries-for-others');
}


}
