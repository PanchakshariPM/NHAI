import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginRequest: any = {
    name: '',
    password: ''
  }

  constructor(
    public restService: RestService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  login() {
    this.restService.login(this.loginRequest).subscribe(response => {
      // console.log('res of login:', response);
      if (response.statusCode === 200) {
        this.router.navigate(['/views/dashboard'])
      }
    })
  }


}
