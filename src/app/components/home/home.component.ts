import { Component, OnInit } from '@angular/core';
import {QueryService} from '../../_services/query.service';
import { catchError } from 'rxjs/operators';
import {ToastrManager} from 'ng6-toastr-notifications';
import {AuthenticationService } from '../../_services/authentication.service';
import {AdminService} from '../../_services/admin.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  category:string="";
  description:string=""
  loading:boolean=false;
  categories:string[]=["PF","Income tax","Accounting","Leave Balance","Salary","Others"];
  isSubmitApiCalled:boolean=false;
  constructor(private data:AdminService,private queryService:QueryService,private toastr:ToastrManager, private authenticationService :AuthenticationService) { }

  ngOnInit() {
    this.CheckJWTAuthentication();
  }
  CheckJWTAuthentication(){
      this.authenticationService.check_JWT_IS_VALID().pipe(
        result=>{
          return result;
        },
        catchError(
          (err)=>{
               this.toastr.errorToastr(err,"Error",{position:'bottom-right'});
               return "";
          }
        )
      ).subscribe(
    result=>{
      if(result["failed"]){
          // this.authenticationService.logout();
          // this.router.navigateByUrl('/');
         this.data.changeMessage(false);
      }else{
        this.data.changeMessage(true);
      }
    }
  )
  }
  onSendQueryCliked(){
    this.isSubmitApiCalled=true;
    if(this.category !==undefined && this.category!==null && this.category !==""&&
     this.description!==undefined && this.description !==null && this.description!==""
     ){
     this.loading=true;
     this.queryService.save_query_details(this.category,this.description,localStorage.getItem('email'),'Pending','')
          .pipe(
     result=>{
       return result;
     },
     catchError(
       (err)=>{
             this.isSubmitApiCalled=false;
             this.loading=false;
            this.toastr.errorToastr(err,"Error",{position:'bottom-right'});
            return "";
       }
     )
   ).subscribe(
       result=>{
         
        // console.log(result);
         if(result){
           this.loading=false;
           this.toastr.successToastr(result["message"],"Success",{position:'bottom-right'});
           this.category="";
           this.description="";
         }
         this.isSubmitApiCalled=false;

       }
     )
  }else{
    if(!this.category){
      this.toastr.warningToastr("Category should not be empty","Warning",{position:'bottom-right'});
    }
    if(!this.description){
      this.toastr.warningToastr("Description should not be empty","Warning",{position:'bottom-right'});
    }
    this.isSubmitApiCalled=false;
  }
  }
}
