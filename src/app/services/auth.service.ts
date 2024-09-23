import { isPlatformBrowser } from "@angular/common";
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";


@Injectable({
    providedIn: "root",
})
export class AuthService {
    constructor(@Inject(PLATFORM_ID) private platformId: any){}
    token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJlbmFuQGdtYWlsLmNvbSIsImlkIjoiNjZjM2VmZmU3ZTA0MWU4Y2MzNGEyZWU4IiwiZXhwIjoxNzI3MDM2NDA5fQ.NAiFM6MfLNHUxJQZQmtX60k8o_CBYf4kCCcRRxwC0NU";
    
    setToken(token: string, loggedUser: any){
        sessionStorage.setItem("authToken", token);
        sessionStorage.setItem("authId", loggedUser.uid);
    }

    getToken(): string | null {
        let token: string | null = this.token; // Jeton par défaut
        if (typeof window !== 'undefined') {
            token = sessionStorage.getItem('authToken');
        }
        return token;
    }

    getId(): string | null{
        let id: string | null = null;
        if (typeof window !== 'undefined') {
            id = sessionStorage.getItem('authId');
        }
        return id;
    }

    logout() {
        sessionStorage.removeItem("authToken");
        sessionStorage.removeItem("authId");
    }

    isAuthenticated(): boolean{
        if(isPlatformBrowser(this.platformId)){
            return !!this.getToken();
        }
        return false;
    }
}