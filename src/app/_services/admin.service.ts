import { Injectable } from '@angular/core';
// import {HttpClient,HttpHeaders} from '@angular/common/http';
import { environment } from './../../environments/environment';
const apiUrl=environment.apiUrl;
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private messageSource = new BehaviorSubject(false);
  private adminMessageSource = new BehaviorSubject(false);
  private email= new BehaviorSubject(false);
  emailMessage= this.email.asObservable();
  isAdminLogged = this.adminMessageSource.asObservable();
  currentMessage = this.messageSource.asObservable();
  constructor( ) { }
  changeMessage(message: boolean) {
    this.messageSource.next(message)
  }
  changeAdminStatus(message:boolean){
    this.adminMessageSource.next(message);
  }
  changeEmailStatus(message:boolean){
    this.email.next(message);
  }
 
}
