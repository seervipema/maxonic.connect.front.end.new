import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from './../../environments/environment';
const apiUrl=environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class QueryService {

  constructor(private http:HttpClient) { }

  
  save_query_details(request_category:string,request_description:string,requested_by:string,request_status:string,request_resolved_by:string){
    var body = {request_category,request_description,requested_by,request_status,request_resolved_by};
    return this.http.post(`${apiUrl}/query/request`,body);
  }
  //pending query part
  get_request_details(email:string){
    return this.http.get(`${apiUrl}/query/request/${email}`);
 }
 update_request_status(email:string,request_id,comments){
   return this.http.put(`${apiUrl}/query/request`,{email:email,request_id,comments});
 }
 //start of  admin request
 get_request_details_for_admin(email:string){
   return this.http.get(`${apiUrl}/query/request/admin/${email}`);
 }
 get_in_progress_request_details_for_admin(email:string){
   return this.http.get(`${apiUrl}/query/inProgress/admin/${email}`);
 }
 get_top_10_fixed_queries_for_admin(email:string){
  return this.http.get(`${apiUrl}/query/admin/resolved/${email}`);
}
///////end of admin request
 ///resolved query part 
 get_top_10_fixed_queries(email:string){
   return this.http.get(`${apiUrl}/query/topQueries/${email}`);
 }
 change_status(status:string,request_id:string,comments:string){
   return this.http.post(`${apiUrl}/query/changeStatus`,{status,request_id,comments});
 }
 //in progress query part
 get_in_progress_request_details(email:string){
    return this.http.get(`${apiUrl}/query/inProgress/${email}`);
 }
}
