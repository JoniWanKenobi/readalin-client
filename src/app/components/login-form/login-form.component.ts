import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  @Output() showSignup = new EventEmitter<string>();

  username: string;
  password: string;

  feedbackEnabled: boolean = false;
  processing: boolean = false;
  error: null;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  showSignupClicked(){
    this.showSignup.emit('signup');
  }

  disableFeedback(){
    this.feedbackEnabled = false;
    this.error = null;
  }

  login(form){
    this.feedbackEnabled = true;
    this.error = null;
    if(form.valid){
      this.processing = true;
      const user = {username: this.username, password: this.password};
      this.authService.login(user)
        .then((response) => {
          this.processing = false;
          this.router.navigate(['books']);
        })
        .catch((err) => {
          this.error = err.error.error;
          this.processing = false;
        })
      this.feedbackEnabled = false;
    }
  }
}
