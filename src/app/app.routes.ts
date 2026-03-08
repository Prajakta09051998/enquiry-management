import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { SubmitEnquiry } from './pages/submit-enquiry/submit-enquiry';
import { EnquiryList } from './pages/enquiry-list/enquiry-list';
import { Dashboard } from './pages/dashboard/dashboard';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: Home
    },
    {
        path: 'login',
        component: Login,
    },
    {
        path: "submit-enquiry",
        component: SubmitEnquiry
    },
    {
        path: "submit-enquiry/:id",
        component: SubmitEnquiry
    },
    {
        path: 'enquiry-list',
        component: EnquiryList,
        canActivate: [AuthGuard]
    },
    {
        path: 'dashboard',
        component: Dashboard,
        canActivate: [AuthGuard]
    }
];
