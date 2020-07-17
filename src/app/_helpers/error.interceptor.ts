import {Injectable} from '@angular/core';
import {HttpInterceptor,HttpRequest,HttpHandler,HttpEvent} from '@angular/common/http';
import {Observable,throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AuthenticationService} from '../_services/authentication.service';
import {Router} from  "@angular/router";
import {AdminService} from '../_services/admin.service';
/*
Http error interceptor works with the calling service and the API's
It intercepts the responses from the API and check for the status codes (if there were any errors).
Error Status 401: Unauthorized Response - the user will be automatically logged out
All other errors are RE-THROWN to be caught by the calling service so an alert can be displayed to the user 
 */
@Injectable()
export class ErrorInterceptor implements HttpInterceptor{
      constructor(private authenticateService:AuthenticationService,private router:Router,private data:AdminService){}

      intercept(request:HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>>{
          return next.handle(request)
          .pipe(
              catchError(err=>{
                  if(err.status ===401){
                      //auto logout on unauthorized response
                      this.authenticateService.logout();
                      this.router.navigate(['/login']);
                      this.data.changeMessage(false);
                    //   window.location.href = "/login";
                  }
                  const error =err.error.message || err.statusText;
                  return throwError(error);
              })
          )
      }
}