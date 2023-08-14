import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userData: BehaviorSubject<any> = new BehaviorSubject('');
  private dataUrl = 'assets/userInfo.json';

  public Data(): Observable<any> {
    return this.userData.asObservable();
  }

  constructor(private http: HttpClient) {}

  getUserData(): Observable<any> {
    return this.http.get<any>(this.dataUrl);
  }
}
