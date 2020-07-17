import { Component, OnInit } from '@angular/core';
import {QueryService} from '../../_services/query.service';
import { catchError } from 'rxjs/operators';
import {ToastrManager} from 'ng6-toastr-notifications';
import {AdminService} from '../../_services/admin.service';
import {AuthenticationService} from '../../_services/authentication.service';
@Component({
  selector: 'app-resolved-queries-for-all',
  templateUrl: './resolved-queries-for-all.component.html',
  styleUrls: ['./resolved-queries-for-all.component.css']
})
export class ResolvedQueriesForAllComponent implements OnInit {
  show :boolean =false;
  rowNumber:number =-1;
  loading:boolean=false;
  allRequestDetials:any=[];
  isAdmin:boolean=false;
  constructor(
    private queryService:QueryService,private toastr:ToastrManager,
    private data:AdminService,
    private authenticationService:AuthenticationService
  ) { }
  ngOnInit() {
    this.get_top_queries_details();
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
  onShowMoreClicked(index:number){
    this.show=true;
    this.rowNumber=index;
   }
   get_top_queries_details(){

    
       this.queryService.get_top_10_fixed_queries_for_admin(localStorage.getItem('email')).pipe(
            result=>{
                     return result;
                    },
            catchError(
            (err)=>{
                 if(err ==="No resolved queries found in database."){
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
    
 }

}
