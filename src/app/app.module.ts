import { BrowserModule } from '@angular/platform-browser';
import { NgModule ,Injector} from '@angular/core';
import {ReactiveFormsModule,FormsModule} from '@angular/forms'
import {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppComponent } from './app.component';
import {routing} from './app.routing'
import { DashboardComponent } from './dashboard/dashboard.component';
import { JwtInterceptor} from './_helpers/jwt.interceptor';
import {ErrorInterceptor} from './_helpers/error.interceptor';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ToastrModule } from 'ng6-toastr-notifications';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
// import { ToastrModule } from 'ng6-toastr-notifications';
import { TooltipModule } from 'ng2-tooltip-directive';
import { HomeComponent } from './components/home/home.component';
import { ViewQueriesComponent } from './components/view-queries/view-queries.component';
import { PasswordStrengthMeterModule } from 'angular-password-strength-meter';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { PasswordStrengthComponent } from './components/password-strength/password-strength.component';
import { ResolvedQueriesComponent } from './components/resolved-queries/resolved-queries.component';
import { AdminResetPasswordEmployeeComponent } from './components/admin-reset-password-employee/admin-reset-password-employee.component';
import { InProgressComponent } from './in-progress/in-progress.component';
import { ResolvedQueriesForAllComponent } from './components/resolved-queries-for-all/resolved-queries-for-all.component';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SpinnerComponent,
    LoginComponent,
    SignupComponent,
    ResetPasswordComponent,
    HomeComponent,
    ViewQueriesComponent,
    ForgetPasswordComponent,
    PasswordStrengthComponent,
    ResolvedQueriesComponent,
    AdminResetPasswordEmployeeComponent,
    InProgressComponent,
    ResolvedQueriesForAllComponent,
  ],
  imports: [
    BrowserModule, ReactiveFormsModule,
    HttpClientModule,
    routing,
    FormsModule,
    BrowserAnimationsModule,
    RxReactiveFormsModule,
    ToastrModule.forRoot(),
    TooltipModule,
    PasswordStrengthMeterModule
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,useClass:JwtInterceptor,multi:true
    },
    {
      provide:HTTP_INTERCEPTORS,useClass:ErrorInterceptor,multi:true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents:[]
})
export class AppModule { 

  constructor(private injector: Injector){
   
  }
  ngDoBootstrap() {}
}
