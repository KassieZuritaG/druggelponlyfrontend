import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Role} from "../../enum/Role";
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    isInvalid: boolean;
    isLogout: boolean;
    submitted = false;
    socialUser: SocialUser;
    userLogged: SocialUser;
    isLogged: boolean;


    model: any = {
        username: '',
        password: '',
        remembered: false
    };

    returnUrl = '/';

    constructor(private userService: UserService,
                private router: Router,
                private route: ActivatedRoute,
                private authService: SocialAuthService) {
    }

    ngOnInit() {
        let params = this.route.snapshot.queryParamMap;
        this.isLogout = params.has('logout');
        this.returnUrl = params.get('returnUrl');
        //comprobar si estoy logeado o no
        this.authService.authState.subscribe(
            data => {
                this.userLogged = data;
                this.isLogged = (this.userLogged != null);
            }
        )
    }

    onSubmit() {
        this.submitted = true;
        this.userService.login(this.model).subscribe(
            user => {
                if (user) {
                    if (user.role != Role.Customer) {

                        this.returnUrl = '/seller';
                    }

                    this.router.navigateByUrl(this.returnUrl);
                } else {
                    this.isLogout = false;
                    this.isInvalid = true;
                }

            }
        );
    }

    fillLoginFields(u, p) {
        this.model.username = u;
        this.model.password = p;
        this.onSubmit();
    }

    //social login

    signInWithGoogle(): void {
        this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
            data =>{
                this.socialUser = data;
                this.isLogged = true;
                this.router.navigateByUrl(this.returnUrl);
            }
        );
    }

    signInWithFB(): void {
        this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
            data => {
                this.socialUser = data;
                this.isLogged = true;
                this.router.navigateByUrl(this.returnUrl);
            }
        );
    }

    logOut(): void{
        this.authService.signOut();
        this.router.navigate(['/login']);
    }
}

