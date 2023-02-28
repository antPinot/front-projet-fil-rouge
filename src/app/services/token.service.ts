import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

/**token service pert de dire si je suis connecte ou pas */
export class TokenService {
  

  constructor(private router: Router) { }
 

  /**methode getToken  */
  getToken(): boolean{
    
    const token = localStorage.getItem('token')  
    console.log(token)
    return !! token
 
}

/**methode cleartoken */
  clearToken(){
    localStorage.removeItem('token')
    this.router.navigate(["/"]);
  }


/**methode Savetoken */ 
  saveToken(token: string): boolean {
    try {
        localStorage.setItem('token', token);
        return true;
    } catch (e) {
        console.error('Error saving token:', e);
        return false;
    }
}
}
