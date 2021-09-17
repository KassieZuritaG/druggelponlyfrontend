import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {apiUrl} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class HomepageService {

    private homepageUrl = `${apiUrl}/homepage`;

}