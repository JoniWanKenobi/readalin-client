import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {
  @Output() showLogin = new EventEmitter<string>();

  username: string;
  password: string;
  email: string;
  error: null;

  feedbackEnabled: boolean = false;
  processing: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  showLoginClicked(){
    this.showLogin.emit('login');
  }

  disableFeedback(){
    this.feedbackEnabled = false;
    this.error = null;
  }

  signup(form){
    this.feedbackEnabled = true;
    this.error = null;
    if(form.valid){
      this.processing = true;
      const newUser = {username: this.username, email: this.email, password: this.password};
      this.authService.signup(newUser)
        .then((usr) => {
          this.processing = false;
          this.router.navigate(['books', usr._id]);
        })
        .catch((err) => {
          this.error = err.error.error;
          this.processing = false;
        })
      this.feedbackEnabled = false;
    }
  }


}

