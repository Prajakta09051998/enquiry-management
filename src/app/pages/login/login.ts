import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  router = inject(Router);
  loginObj: any  = {
    username: '',
    pwd: ''
  }
  login() {
    if(this.loginObj.username=='admin' && this.loginObj.pwd == '112233') {
      alert('Login successful!');
      localStorage.setItem('enquiryApp', 'admin');
      this.router.navigate(['/enquiry-list']);
    } else {
      alert('Please enter both username and password.');
    }
  }
}
