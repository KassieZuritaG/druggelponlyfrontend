import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

//social login
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';

import {AppComponent} from './app.component';
import {NavigationComponent} from './parts/navigation/navigation.component';
import {CardComponent} from './pages/card/card.component';
import {PaginationComponent} from './parts/pagination/pagination.component';
import {AppRoutingModule} from './app-routing.module';
import {LoginComponent} from './pages/login/login.component';
import {SignupComponent} from './pages/signup/signup.component';
import {DetailComponent} from './pages/product-detail/detail.component';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {CartComponent} from './pages/cart/cart.component';
import {CookieService} from "ngx-cookie-service";
import {ErrorInterceptor} from "./_interceptors/error-interceptor.service";
import {JwtInterceptor} from "./_interceptors/jwt-interceptor.service";
import {OrderComponent} from './pages/order/order.component';
import {OrderDetailComponent} from './pages/order-detail/order-detail.component';
import {ProductListComponent} from './pages/product-list/product.list.component';
import {UserDetailComponent} from './pages/user-edit/user-detail.component';
import {ProductEditComponent} from './pages/product-edit/product-edit.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { FiltroProductoPipe } from './pipes/filtro-producto.pipe';
//import { ProductCreateComponent } from './pages/product-create/product-create.component';

@NgModule({
    declarations: [
        AppComponent,
        NavigationComponent,
        CardComponent,
        PaginationComponent,
        LoginComponent,
        SignupComponent,
        DetailComponent,
        CartComponent,
        OrderComponent,
        OrderDetailComponent,
        ProductListComponent,
        UserDetailComponent,
        ProductEditComponent,
        HomepageComponent,
        FiltroProductoPipe,
       // ProductCreateComponent,

    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        SocialLoginModule,
    ],
    providers: [CookieService,
        {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
        {
            provide: 'SocialAuthServiceConfig',
            useValue: {
              autoLogin: false,
              providers: [
                {
                  id: GoogleLoginProvider.PROVIDER_ID,
                  provider: new GoogleLoginProvider(
                    '549387956834-vga7ob0a18o4dpndm3d51pgpdos5sa1s.apps.googleusercontent.com'
                  )
                },
                {
                  id: FacebookLoginProvider.PROVIDER_ID,
                  provider: new FacebookLoginProvider('1069926006872558')
                }
              ]
            } as SocialAuthServiceConfig,
          }
    ],

    bootstrap: [AppComponent]
})
export class AppModule {
}
