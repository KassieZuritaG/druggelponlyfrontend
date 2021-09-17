import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {User} from "../../models/User";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user: User;
  socialUser: SocialUser;
  userLogged: SocialUser;
  isLogged: boolean;

  constructor( private location: Location,
               private userService: UserService,
               private router: Router,
               private authService: SocialAuthService) {
    this.user = new User();

  }



  ngOnInit() {
    //comprobar si estoy logeado o no
    this.authService.authState.subscribe(
      data => {
          this.userLogged = data;
          this.isLogged = (this.userLogged != null);
      }
  )
  }

  onSubmit() {
    this.userService.signUp(this.user).subscribe(u => {
      this.router.navigate(['/login']);
    },
        e => {});
  }

   //social login

   signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
        data =>{
            this.socialUser = data;
            this.isLogged = true;
            this.router.navigate(['/']);
        }
    );
  }

signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
        data => {
            this.socialUser = data;
            this.isLogged = true;
            this.router.navigate(['/']);
        }
    );
}

logOut(): void{
    this.authService.signOut();
    this.router.navigate(['/login']);
}

}
