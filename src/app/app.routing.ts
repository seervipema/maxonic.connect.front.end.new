import {Routes,RouterModule,PreloadAllModules} from '@angular/router';
import {AuthGuard} from './_guards/auth.guard';
import {DashboardComponent} from './dashboard/dashboard.component'
import { LoginComponent } from './components/login/login.component';
import {SignupComponent} from './components/signup/signup.component';
import {ResetPasswordComponent} from './components/reset-password/reset-password.component';
import {HomeComponent} from './components/home/home.component';
import {ViewQueriesComponent} from "./components/view-queries/view-queries.component";
import {ForgetPasswordComponent } from "./components/forget-password/forget-password.component";
import {ResolvedQueriesComponent} from './components/resolved-queries/resolved-queries.component';
import {InProgressComponent} from './in-progress/in-progress.component';
import {ResolvedQueriesForAllComponent} from './components/resolved-queries-for-all/resolved-queries-for-all.component';
import {AdminResetPasswordEmployeeComponent} from './components/admin-reset-password-employee/admin-reset-password-employee.component';
const appRoutes:Routes =[ 
    {
       path:'dashboard',component:DashboardComponent,canActivate:[AuthGuard]
    },
    {
         path:'login',component:LoginComponent
    },
    {
         path:'sign-up',component:SignupComponent
    },
    {
         path:'resolved-queries',component:ResolvedQueriesComponent,canActivate:[AuthGuard]
    },
    {
         path:'resolved-queries-for-others',component:ResolvedQueriesForAllComponent,canActivate:[AuthGuard]
    },
    {
         path:'in-progress',component:InProgressComponent,canActivate:[AuthGuard]
    },
    {
         path:'home',component:HomeComponent,canActivate:[AuthGuard]
    },
    {
         path:'reset-password/:email/:token',component:ForgetPasswordComponent
    },
    {
         path:'view-queries',component:ViewQueriesComponent,canActivate:[AuthGuard]
    },
    {
         path:'reset-password',component:ResetPasswordComponent,canActivate:[AuthGuard]
    },
    {
        path:'admin-reset-password',component:AdminResetPasswordEmployeeComponent,canActivate:[AuthGuard]
    },
    {
         path:'',redirectTo:'login',pathMatch:'full'
    },
    {
        path:'**',redirectTo:'login'
    }
];
export const routing =RouterModule.forRoot(appRoutes,{useHash:true,preloadingStrategy:PreloadAllModules});