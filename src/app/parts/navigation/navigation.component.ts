import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {Subscription} from "rxjs";
import {JwtResponse} from "../../response/JwtResponse";
import {Router} from "@angular/router";
import {Role} from "../../enum/Role";
import { SocialAuthService, SocialUser } from 'angularx-social-login';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit, OnDestroy {


    currentUserSubscription: Subscription;
    name$;
    name: string;
    currentUser: JwtResponse;
    root = '/';
    Role = Role;
    userLogged: SocialUser;
    isLogged: boolean;

    constructor(private userService: UserService,
                private router: Router,
                private authService: SocialAuthService
    ) {

    }


    ngOnInit() {
        this.name$ = this.userService.name$.subscribe(aName => this.name = aName);
        this.currentUserSubscription = this.userService.currentUser.subscribe(user => {
            this.currentUser = user;
            if (!user || user.role == Role.Customer) {
                this.root = '/';
            } else {
                this.root = '/seller';
            }
        });
        this.authService.authState.subscribe(
            data => {
                this.userLogged = data;
                this.isLogged = (this.userLogged != null);
            }
        )
    }

    ngOnDestroy(): void {
        this.currentUserSubscription.unsubscribe();
        // this.name$.unsubscribe();
    }

    logout() {
        this.userService.logout();
        this.authService.signOut().then(
            data => {
                this.router.navigate(['/']);
            }
        );
        // this.router.navigate(['/login'], {queryParams: {logout: 'true'}} );
    }

}
