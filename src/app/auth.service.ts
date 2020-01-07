import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})

export class AuthService {

    private registerUrl = "http://localhost:3000/api/register";
    private loginUrl = "http://localhost:3000/api/login";

    constructor(private http: HttpClient) { }

    registerUser(user: object): Observable<string> {
        return this.http.post<string>(this.registerUrl, user);
    }

    loginUser(user: object): Observable<string> {
        return this.http.post<string>(this.loginUrl, user);
    }

    loggedIn(): boolean {
        return !!localStorage.getItem("token");
    }

    logoutUser(): void {
        localStorage.removeItem("token");
    }

    getToken(): string {
        return localStorage.getItem("token");
    }
}
