import { Component, OnInit } from '@angular/core';
import {QueryService} from '../_services/query.service';
import { catchError } from 'rxjs/operators';
import {ToastrManager} from 'ng6-toastr-notifications';
import {AdminService} from '../_services/admin.service';
import {AuthenticationService} from '../_services/authentication.service';
@Component({
  selector: 'app-in-progress',
  templateUrl: './in-progress.component.html',
  styleUrls: ['./in-progress.component.css']
})
export class InProgressComponent implements OnInit {
  show :boolean =false;
  rowNumber:number =-1;
  rowNumber1:number =-1;
  show2:boolean=false;
  rowNumber2:number = -1;
  changeStatusComments:string;
  isAdmin:boolean=false;
  comments:string;
  loading:boolean=false;
  allRequestDetials:any=[];
  request_id_to_resolve:string;
  show1:boolean=false;
  isResolveQueryClicked:boolean=false;
  constructor(
    private queryService:QueryService,private toastr:ToastrManager,
    private data:AdminService,
    private authenticationService:AuthenticationService
    
  ) { }

  ngOnInit() {
    this.CheckJWTAuthentication();
    this.isResolveQueryClicked=false;
    this.get_all_pending_request_details();
    let loginEmail=localStorage.getItem('email');           
    if(loginEmail==='pema@maxonic.com'||loginEmail==='nishant@maxonic.com'||loginEmail==='paduka@maxonic.com' ){
          this.isAdmin=true;
    }else{
      this.isAdmin=false;
    }
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
  get_all_pending_request_details(){

    let loginEmail=localStorage.getItem('email'); 
    if(loginEmail==='pema@maxonic.com' ||loginEmail==='nishant@maxonic.com'||loginEmail==='paduka@maxonic.com' ){
       this.queryService.get_in_progress_request_details_for_admin(localStorage.getItem('email')).pipe(
            result=>{
                     return result;
                    },
            catchError(
            (err)=>{
                 if(err ==="No in progress request found in database"){
                    this.allRequestDetials=[];
                 }
                 this.loading=false;
                 this.toastr.errorToastr(err,"info",{position:'bottom-right'});
                 return "";
                   }
                  )
       ).subscribe(result=>{
         if(result["result"].length===0){
          this.allRequestDetials=[]
         }else {
          this.allRequestDetials=result["result"];
         }
       })
    }else{
       this.queryService.get_in_progress_request_details(localStorage.getItem('email'))
       .pipe(
        result=>{
                 return result;
                },
        catchError(
        (err)=>{
             if(err ==="No in progress request found in database"){
                this.allRequestDetials=[];
             }
             this.loading=false;
             this.toastr.errorToastr(err,"info",{position:'bottom-right'});
             return "";
               }
              )
   ).subscribe((result)=>{
     console.log(result);
     if(result["result"].length === 0){
      this.allRequestDetials=[]
         this.toastr.infoToastr("Query not found in database","info",{position:'bottom-right'});
     }else{
      this.allRequestDetials=result["result"];
     }
   })
    } 
 }
onShowMoreClicked(index:number){
 this.show=true;
 this.rowNumber=index;
}
changeStatus(status,request_id){
  if(request_id && status  && this.changeStatusComments){
    this.loading=true
    this.queryService.change_status(status,request_id,this.changeStatusComments).pipe(
      result=>{
        return result;
      },
      catchError(
        (err)=>{
              this.loading=false;
             this.toastr.errorToastr(err,"Error",{position:'bottom-right'});
             return "";
        }
      )
    ).subscribe((result)=>{
      this.loading=false;
      this.toastr.successToastr(result["message"],"Success",{position:'bottom-right'});
      this.get_all_pending_request_details();
    });
  }else{
    if(!request_id){
      this.toastr.warningToastr("Request Id should not be empty.","Warning",{position:'bottom-right'});
    }else if(!status){
      this.toastr.warningToastr("Status should not be empty.","Warning",{position:'bottom-right'});
    }else if(!this.changeStatusComments){
      this.toastr.warningToastr("Comments should bot be empty.","Warning",{position:'bottom-right'});
    }
  }
}
onResolveClicked(){
  this.isResolveQueryClicked=true;
  if(this.comments){
 this.loading=true;
 this.queryService.update_request_status(localStorage.getItem('email'),this.request_id_to_resolve,this.comments)
         .pipe(
   result=>{
     return result;
   },
   catchError(
     (err)=>{
          this.isResolveQueryClicked=false;
           this.loading=false;
          this.toastr.errorToastr(err,"Error",{position:'bottom-right'});
          return "";
     }
   )
 )
 .subscribe((result)=>{
   this.isResolveQueryClicked=false;
   this.loading=false;
   this.comments="";
    this.toastr.successToastr(result["message"],"Success",{position:'bottom-right'});
    this.get_all_pending_request_details();
    this.show1=false;
 })
}else{
  this.toastr.warningToastr("Comments should not be empty.","Warning",{position:'bottom-right'});
  this.isResolveQueryClicked=false;
}
}
afterResolvedClicked(request_id:string,index:number){
  this.show1=true;
  this.show2=false;
  this.rowNumber1=index;
  this.comments=""
this.request_id_to_resolve=request_id;
}
afterInProgressClicked(index:number){
  this.show2=true;
  this.show1=false;
  this.rowNumber2=index;
  this.changeStatusComments=""

}
onModalCloseClicked(){
  this.show1=false;
}
onChangeStatusModalCloseClicked(){
  this.show2=false;
 
}
}
